new Vue({
    el: '#app',
    data: {
        // 卡片陣列
        cards: [],
        // 被選中的卡片
        selectedCard: null,
        // 卡片內容陣列
        content:[
            'Card 99 Content',
            'Card 2 Content',
            'Card 3 Content',
            'Card 4 Content',
            'Card 5 Content',
            'Card 6 Content',
            'Card 7 Content',
            'Card 8 Content',
            'Card 9 Content',
            'Card 10 Content',
            'Card 11 Content',
            'Card 12 Content',
            'Card 13 Content',
            'Card 14 Content',
            'Card 15 Content',
            'Card 16 Content',
            'Card 16 Content'
        ]
    },
    created() {
        this.fetchContentFromGoogleSheet();
    },
    methods: {
        async fetchContentFromGoogleSheet() {
            const sheetId = '1HmuhskPljpFyniYWvF-UU6aDaD43Fiy3IOxBdI7tq4Y';
            const apiKey = 'AIzaSyCXVrCX9QWtx9MmUsDHi9vePsJovuu7Tgs'; // 替換成你的 API 金鑰
            const sheetName = 'Card';
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

            try {
                const response = await axios.get(url);
                const data = response.data;
                if (data.values) {
                    this.content = data.values.flat(); // 將試算表的內容展平為一維陣列
                    this.initializeCards();
                }
            } catch (error) {
                console.error('Error fetching data from Google Sheets:', error);
            }
        },
        initializeCards() {
            this.cards = this.content.map((content, index) => ({
                id: index + 1,
                title: '🐱',
                content,
                flipped: false,
                showContent: false
            })).sort(() => Math.random() - 0.5);
        },
        showCardContent(card) {
            if (!card.flipped) {
                card.flipped = true;
                this.selectedCard = card;
            } 
        }
    }
});