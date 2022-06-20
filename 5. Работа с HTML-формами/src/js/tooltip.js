export class Tooltip {
    constructor() {
        this._tooltips = [];
    }

    showTooltip(message, element) {
        const tooltipElement = document.createElement('DIV');

        tooltipElement.classList.add('form-error')
        tooltipElement.textContent = message;

        const id = performance.now();

        this._tooltips.push({
            id,
            element: tooltipElement
        })

        document.body.appendChild(tooltipElement);

        const { right, top } = element.getBoundingClientRect();

        tooltipElement.style.left = right + 5 + 'px';
        tooltipElement.style.top = top + element.offsetHeight / 2 - tooltipElement.offsetHeight / 2 + 'px';

        return id;
    }

    removeTooltip(id) {
        const tooltip = this._tooltips.find(t => t.id === id);

        tooltip.element.remove();

        this._tooltips = this._tooltips.filter(t => t.id !== id);
    }
}