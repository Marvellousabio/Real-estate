export const fadeIn =(direction, delay) =>{
    return{
        hidden:{
            y:direction ==='up' ? 40 : direction === 'down' ? -40 : 0,
            opacity:0,
            x:direction ==='left' ? 40 : direction === 'right' ? -40 : 0,
        },
        show: {
            y:0,
            x:0,
            opacity:1,
            transition: {
                type:'tween',
                duration:1.2,
                delay:delay,
                else:[0.25,0.25,0.25,0.75]
            }
        }
    }
}
// Animation variants
export const linkVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

export const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

export const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };