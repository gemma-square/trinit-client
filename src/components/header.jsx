import React, { Fragment, useState, useEffect } from 'react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';
import pic from "../assets/carbon1.svg";
import FileUploadHandler from './fileuploadhandler.jsx';

export default function Header() {
    const el = React.useRef(null);

    React.useEffect(() => {
        const initializeTyped = () => {
            const typed = new Typed(el.current, {
                strings: ['Welcome to', 'Machine Learning ^3000'],
                typeSpeed: 60,
                backSpeed: 50,
                loop: true
            });
            return typed;
        };

        const timeoutId = setTimeout(() => {
            initializeTyped();
        }, 100);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    const dataChangerThumbnail = (value) => {
        setFormData({...formData, thumbImage: value})
    }

    const formInitial = {
        thumbImage: '',
    }
    const [formData, setFormData] = useState(formInitial);

    return (
        <div id="home" className="flex items-center justify-center h-full">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-1/2 p-12 m-3"
            >
                <span ref={el} className="text-7xl font-semibold"/>
                <p className="mt-16 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, rerum? Error officia temporibus voluptatum amet illum magni, eos itaque impedit vero veniam, nostrum reprehenderit quod repellat vel ipsum, corporis cum.</p>
            </motion.div>
            <div className="w-1/2">
                <img className="mx-auto size-10/12" src={pic} alt="Carbon" />
            </div>
        </div>
    );
}
