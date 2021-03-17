import { h, createRef as gCreateRef } from 'gridjs';

export function createDivContainer(creatorFunction) {
    const ref = gCreateRef();
    const div = h('div', { ref: ref });
    setTimeout(() => {
        if (ref.current?.children.length === 0) {
            creatorFunction(ref.current);
        }
    }, 0);
    return div;
}
