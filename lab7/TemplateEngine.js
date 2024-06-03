class TemplateEngine {
    static compile(template, data) {
        let html = template;
        for (const key in data) {
            const value = data[key];
            html = html.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), this.escapeHtml(value));
        }
        return {
            html,
            biteLength: Buffer.byteLength(html)
        };
    }

    static escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
}

export { TemplateEngine };