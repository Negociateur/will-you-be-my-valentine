"use client";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const ValentineBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const hearts = [];
        for (let i = 0; i < 20; i++) {
            hearts.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 20 + 10,
                speed: Math.random() * 1 + 0.5,
                opacity: Math.random() * 0.5 + 0.5
            });
        }
        
        const drawHeart = (x, y, size, opacity) => {
            ctx.globalAlpha = opacity;
            ctx.fillStyle = "#ff7eb3";
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
            ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
            ctx.fill();
            ctx.globalAlpha = 1;
        };
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            hearts.forEach(heart => {
                heart.y -= heart.speed;
                if (heart.y < -heart.size) heart.y = canvas.height + heart.size;
                drawHeart(heart.x, heart.y, heart.size, heart.opacity);
            });
            requestAnimationFrame(animate);
        };
        animate();
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default function Page() {
    const [noCount, setNoCount] = useState(0);
    const [yesPressed, setYesPressed] = useState(false);
    const yesButtonSize = noCount * 20 + 16;

    const handleNoClick = () => {
        setNoCount(noCount + 1);
    };

    const getNoButtonText = () => {
        const phrases = [
            "No",
            "Are you sure?",
            "What if I asked really nicely?",
            "Pretty please",
            "With a chocolate cake on top",
            "What about a matcha date ?",
            "PLEASE",
            "I am going to die of sadness",
            "Yep im definitely dead",
            "ok ur talking to my ghost rn",
            "really ?!",
            ":(((",
            "PRETTY PLEASE",
            "Estoy muerto",
            "Alright gonna date myself then",
        ];

        return phrases[Math.min(noCount, phrases.length - 1)];
    };

    return (
        <div className="h-screen w-screen relative flex flex-col items-center justify-center">
            <ValentineBackground />
            <div className="relative z-10 text-center">
                {yesPressed ? (
                    <>
                        <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="bear kissing gif" />
                        <div className="my-4 text-4xl font-bold">
                            WOOOOOO!!! I love you my dear!! Meet me for our movie date, you get to choose the movie! ;))
                        </div>
                    </>
                ) : (
                    <>
                        <img
                            className="h-[200px]"
                            src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
                            alt="cute love bear with roses"
                        />
                        <h1 className="my-4 text-4xl">Will you be my Valentine?</h1>
                        <div className="flex items-center justify-center">
                            <button
                                className={`mr-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700`}
                                style={{ fontSize: yesButtonSize }}
                                onClick={() => setYesPressed(true)}
                            >
                                Yes
                            </button>
                            <button
                                onClick={handleNoClick}
                                className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                            >
                                {noCount === 0 ? "No" : getNoButtonText()}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
