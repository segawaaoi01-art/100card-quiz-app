"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MESSAGES, getRandomMessage } from "@/data/characterData";

interface CharacterViewProps {
    type?: keyof typeof MESSAGES;
    customMessage?: string;
    trigger?: any;
}

export default function CharacterView({ type = "top", customMessage, trigger }: CharacterViewProps) {
    const [message, setMessage] = useState("");
    const [iconSrc, setIconSrc] = useState("/images/icon_1.png");

    useEffect(() => {
        if (customMessage) {
            setMessage(customMessage);
        } else {
            setMessage(getRandomMessage(type));
        }
        
        // アイコンをランダムに選択 (icon_1.png ～ icon_10.png)
        const randomNum = Math.floor(Math.random() * 10) + 1;
        setIconSrc(`/images/icon_${randomNum}.png`);
    }, [type, customMessage, trigger]);

    return (
        <div className="flex items-center w-full max-w-xl px-2 mb-4 animate-fade-in mx-auto">
            {/* SNS風アイコン (左側) */}
            <div className="relative w-[50px] h-[50px] flex-shrink-0 mr-3">
                <div className="relative w-[50px] h-[50px] rounded-full border-2 border-white shadow-sm overflow-hidden bg-white/50">
                    <Image
                        src={iconSrc}
                        alt="キャラクター"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* SNS風吹き出し (右側) */}
            <div className="flex-1">
                <div className="relative bg-[#d3ccd6] rounded-2xl px-4 py-3 shadow-sm min-h-[50px] flex items-center">
                    <p
                        className="text-white text-sm font-medium leading-relaxed text-left"
                        style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}
                    >
                        {message}
                    </p>

                    {/* 小さな三角形の装飾 (二等辺三角形, 垂直中央) */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-r-[#d3ccd6]"></div>
                </div>
            </div>
        </div>
    );
}
