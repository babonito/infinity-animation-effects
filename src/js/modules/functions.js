export const isWebp = () => {
    const checkWebp = () => {
        try {
            return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
        } catch (err) {
            return false;
        }
    }
    let className = checkWebp() === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
}