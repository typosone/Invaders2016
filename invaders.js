"use strict";
/**
 * インベーダーみたいなやつ作ります
 */

class Player {
    constructor(input, x, y, speed) {
        this.input = input;
        this.pos = {'x': x, 'y': y};
        this.bullet = null;
        this.speed = speed;
    }

    move() {
        if (this.input.isLeft && this.input.isRight) {
            // なにもしない
        } else if (this.input.isLeft) {
            this.pos.x -= this.speed;
        } else if (this.input.isRight) {
            this.pos.x += this.speed;
        }
    }
    draw(ctx) {
        // TODO: 移動関連を先にやる

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
    }
}

window.addEventListener("DOMContentLoaded", function () {
    // 必要な定数、変数を設定しておく
    const canvas = document.getElementById("main");
    const ctx = canvas.getContext('2d');
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const SPF = 1000 / 30;

    let input = new Input();
    let player = new Player(input, WIDTH / 2, HEIGHT * 14 / 15);

    // キーボード入力イベントをInputクラスとバインド
    document.addEventListener("keydown", input.onKeyDown);
    document.addEventListener("keyup", input.onKeyUp);

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