
export class menuApi {
    constructor() {
        this.url = process.env.NEXT_PUBLIC_HAMBURGUER_API_URL || '';
    }

    async getMenuData() {
        try {
            const url = this.url
            const response = await fetch(url);
            const jsonData = await response.json();
            // 1 second delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            return jsonData.data
        } catch (error) {
            console.error('Error fetching JSON:', error);
            throw error;
        }
    }
}

