type DomContent = string | Node



type ElementFactory<T extends HTMLElement> = (props?: object, ...content: DomContent[]) => T

export function dom(type: string, props?: object, ...content: DomContent[]){
    const element = document.createElement(type);
    if (props){
        for (let property in props){
            if (property.startsWith('on')){
                const eventName = property.slice(2).toLowerCase();
                element.addEventListener(eventName, props[property])
            } else if (property.startsWith('data')) {
                const dataName = property.slice(4,5).toLowerCase() + property.slice(5);
                element.dataset[dataName] = property[dataName];
            } else {
                element[property] = props[property];
            }
        }
    }

    for (let item of content){
        element.append(item);
    }

    return element;
}

export const table:ElementFactory<HTMLTableElement> = dom.bind(null, 'table');
export const thead: ElementFactory<HTMLTableSectionElement> = dom.bind(null, 'thead');
export const tbody: ElementFactory<HTMLTableSectionElement> = dom.bind(null, 'tbody');
export const tr: ElementFactory<HTMLTableCellElement> = dom.bind(null, 'tr');
export const th: ElementFactory<HTMLTableCellElement> = dom.bind(null, 'th');
export const td: ElementFactory<HTMLTableCellElement> = dom.bind(null, 'td');
export const button: ElementFactory<HTMLButtonElement> = dom.bind(null, 'button');
export const a: ElementFactory<HTMLTableCellElement> = dom.bind(null, 'a');
export const h3: ElementFactory<HTMLHeadingElement> = dom.bind(null, 'h3');
export const div: ElementFactory<HTMLDivElement> = dom.bind(null, 'div');
export const p: ElementFactory<HTMLParagraphElement> = dom.bind(null, 'p');
export const span: ElementFactory<HTMLSpanElement> = dom.bind(null, 'span');
export const strong: ElementFactory<HTMLElement> = dom.bind(null, 'strong');


