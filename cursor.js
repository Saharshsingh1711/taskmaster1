document.addEventListener('DOMContentLoaded', () => {
    // Dragging Cursor Style
    document.addEventListener('mousedown', () => {
        document.body.classList.add('is-dragging');
    });

    document.addEventListener('mouseup', () => {
        document.body.classList.remove('is-dragging');
    });

    // Custom Stylish Cursor Move & Hover Effects
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Using animate for a smooth follow delay effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effect for clickable elements
        const clickables = document.querySelectorAll('a, button, input, label, .sidebar-item, .task-item, .custom-checkbox, .company-logo, .dot');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover');
            });
        });
    }
});
