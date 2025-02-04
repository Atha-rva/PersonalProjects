document.querySelector('.bubbly-button').addEventListener('click', function(e) {
    let bubble = document.createElement('span');
    bubble.classList.add('bubble');
    this.appendChild(bubble);

    setTimeout(() => {
        bubble.classList.add('animate');
    }, 0);

    bubble.addEventListener('transitionend', () => {
        bubble.remove();
    });
});
