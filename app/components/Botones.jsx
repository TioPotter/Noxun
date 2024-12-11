import React from "react";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";

const botones = [
  { nombre: "Me gusta", icon: <BiLike className="w-5 h-5" /> },
  { nombre: "Comentar", icon: <FaRegComment className="w-5 h-5" /> },
  { nombre: "Compartir", icon: <PiShareFat className="w-5 h-5" /> },
];

const Botones = () => {
  return (
    <div className="flex w-full mt-3 divide-x divide-gray-200">
      {botones.map((item) => (
        <button 
          key={item.nombre} 
          className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-blue-100 hover:text-black transition-colors"
        >
          {item.icon}
          <span className="text-sm">{item.nombre}</span>
        </button>
      ))}
    </div>
  );
};

export default Botones;