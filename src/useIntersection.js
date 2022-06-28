import { useState, useEffect } from "react";

export default (element, rootMargin) => {
    const [isVisible, setState] = useState({ estado: false, completado: false });

    useEffect(() => {
        const timer = setTimeout(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setState({ estado: entry.isIntersecting, completado: true });
                        observer.unobserve(element.current);
                    } else {
                        setState({estado: false, completado: true});
                        observer.unobserve(element.current);
                    };
                },
                {
                    rootMargin
                }
            );
            element.current && observer.observe(element.current);
            return () => {
                observer.unobserve(element.current);
            };
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return isVisible;
};