"use strict";
/**
 * インベーダーみたいなやつ作ります
 */

class Player {
    /**
     * @return {number}
     */
    static get HALF_WIDTH() {
        return 20;
    }
    constructor(input, x, y, speed, canvas_width) {
        this.input = input;
        this.pos = {'x': x, 'y': y};
        this.bullet = null;
        this.speed = speed;
        this.canvas_width = canvas_width;
    }

    move() {
        if (this.input.isLeft && this.input.isRight) {
            // なにもしない
        } else if (this.input.isLeft) {
            this.pos.x -= this.speed;
        } else if (this.input.isRight) {
            this.pos.x += this.speed;
        }
        // 左側へ行き過ぎたら戻す
        if (this.pos.x < Player.HALF_WIDTH) {
            this.pos.x = Player.HALF_WIDTH;
        }
        // 右側へ行きすぎたら戻す
        if (this.pos.x > this.canvas_width - Player.HALF_WIDTH) {
            this.pos.x = this.canvas_width - Player.HALF_WIDTH;
        }

    }
    draw(ctx) {
        this.move();

        if (this.input.isSpace && this.bullet == null) {
            this.bullet = new Bullet(this.pos.x, this.pos.y);
        }
        if (this.bullet != null) {
            this.bullet.draw(ctx);
            if (!this.bullet.isValid()) {
                this.bullet = null;
            }
        }

        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.strokeStyle = "#FFF";
        ctx.fillStyle = "#FFF";

        ctx.beginPath();
        ctx.moveTo(0, 10);
        ctx.lineTo(-20, 10);
        ctx.lineTo(-20, -7);
        ctx.lineTo(-3, -7);
        ctx.lineTo(0, -10);
        ctx.lineTo(3, -7);
        ctx.lineTo(20, -7);
        ctx.lineTo(20, 10);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.restore();
    }
}

class Input {
    constructor() {
        this.isLeft = false;
        this.isRight = false;
        this.isSpace = false;
    }
    onKeyDown(event) {
        switch (event.code) {
            case "ArrowLeft":
                this.isLeft = true;
                break;
            case "ArrowRight":
                this.isRight = true;
                break;
            case "Space":
                this.isSpace = true;
                break;
            default:
                return;
        }
        event.preventDefault();
    }
    onKeyUp(event) {
        switch (event.code) {
            case "ArrowLeft":
                this.isLeft = false;
                break;
            case "ArrowRight":
                this.isRight = false;
                break;
            case "Space":
                this.isSpace = false;
                break;
            default:
                return;
        }
        event.preventDefault();
        console.log(this);
    }
}

class Bullet {
    /**
     * @return {number}
     */
    static get SPEED() {
        return 15;
    }

    /**
     * @return {number}
     */
    static get HALF_HEIGHT() {
        return 5;
    }

    constructor(x, y) {
        this.pos = {'x': x, 'y': y};
    }

    move() {
        this.pos.y -= Bullet.SPEED;
    }

    isValid() {
        // TODO: 敵との衝突判定で衝突してたらfalseを返す
        if (this.pos.y < -Bullet.HALF_HEIGHT) {
            return false;
        }
        return true;
    }

    draw(ctx) {
        this.move();

        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.strokeStyle = "#FFF";
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.lineTo(0, 5);
        ctx.stroke();

        ctx.restore();
    }
}

window.addEventListener("DOMContentLoaded", function () {
    // 必要な定数、変数を設定しておく
    const canvas = document.getElementById("main");
    const ctx = canvas.getContext('2d');
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const SPF = 1000 / 30;
    const PLAYER_SPEED = 5;

    let input = new Input();
    let player = new Player(input, WIDTH / 2, HEIGHT * 14 / 15, PLAYER_SPEED, WIDTH);

    // キーボード入力イベントをInputクラスとバインド
    document.addEventListener("keydown", (evt) => input.onKeyDown(evt));
    document.addEventListener("keyup", (evt) => input.onKeyUp(evt));

    // メインループ
    let mainLoop = function () {
        // 画面消去
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        // プレイヤーの描画
        player.draw(ctx);

        // 再度この関数を呼び出す予約をする
        setTimeout(mainLoop, SPF);
    };
    // ゲーム起動開始
    setTimeout(mainLoop, SPF);
});