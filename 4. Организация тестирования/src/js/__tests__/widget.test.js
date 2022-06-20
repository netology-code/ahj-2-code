import { InnFormWidget } from "../widget"

test('widget should render', () => {
    document.body.innerHTML = '<div class="container"></div>';

    const container = document.querySelector('.container');
    const widget = new InnFormWidget(container);

    widget.bindToDOM();

    expect(container.innerHTML).toEqual(InnFormWidget.markup);
})

test('widget should add valid class', () => {
    document.body.innerHTML = '<div class="container"></div>';

    const container = document.querySelector('.container');
    const widget = new InnFormWidget(container);

    widget.bindToDOM();

    widget.input.value = '7715964180';
    widget.submit.click();

    expect(widget.input.classList.contains('valid')).toEqual(true);
})