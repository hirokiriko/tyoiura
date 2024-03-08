document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('fortune-form');
    const select = document.getElementById('fortune-select');
    const backButton = document.getElementById('back-button');
    const messageParagraph = document.getElementById('character-message');
    const resultSection = document.getElementById('results-section');
    const loadingIndicator = document.getElementById('loading-indicator');

    // ノーコードストリーズTipsの配列
    const noCodeStoriesTips = [
        {
            title: "ちょいてつちゃん",
            text: `ノーコードガールズのセンター
            会社の広報担当、ノーコードは現在勉強中！
            ちょいっとみんなの開発業務も手伝えるようになってきている
            アイスが大好き🍨とくに苺🍓夏でも冬でもいっつも食べてる系！
            `,
            image: "images/TYOITETU_1.png"
        },
        {
            title: "bubble姉さん",
            text: `得意なノーコード .bubble
            会社では主に.bubbleを使ってバリバリ開発している。だから、みんなからは『バブル姉さん』と呼ばれている
            なんでもこなすスーパーマン的な存在だが、実は超のつく努力家👓
            休日、スキマ時間と常に勉強中(ブックカバーはお洒落な🍍)
            `,
            image: "images/Bubble_1.png"
        },
        {
            title: "Studioちゃん",
            text: `得意なノーコードはStudio
            主に会社ではフラペチーノを横にお洒落にWebサイトを製作している系
            なのでみんなからは『スタジオちゃん』の愛称で親しまれている
            この新カット「えっ！？私の年収低すぎ…」「家政婦のすたじお」ってな感じで結構なお気に入り😂
            `,
            image: "images/Studio_1.png"
        },
        {
            title: "Adalo氏",
            text: `得意なノーコード Adalo
            コミュ障キャで厨二病、ネラ―気質のゲーム脳で会社では主にアプリ開発担当
            引きこもりがちな毎日を送っていたが、入社のきっかけはちょいてつ会だとかｗ
            よくこのブラック会社めっ！とキレている、ノコガ達からは『アダロ氏』と愛を込めて呼ばれている模様
            `,
            image: "images/Adalo_1.png"
        },
        {
            title: "フラフロちゃん",
            text: `得意なノーコードはFlutterFlow
            大企業のご令嬢であり、超のつくお嬢様
            本人は職業体験のノリだが、アプリ開発から営業まで全てを問題なく対応している
            秘めたる野望はノーコードガールズたち全員と結婚すること、常に抱き締めたいほど可愛いい彼女たちのことがガチLOVEらしい…❤️
            `,
            image: "images/FlutterFlow_1.png"
        },
    ];

    // Tipsをランダムに選択してloadingIndicatorに表示する関数
    function showRandomNoCodeStoryTip() {
        const randomTip = noCodeStoriesTips[Math.floor(Math.random() * noCodeStoriesTips.length)];
        document.getElementById('tip-title').textContent = randomTip.title;
        document.getElementById('tip-text').textContent = randomTip.text;
        document.getElementById('tip-image').src = randomTip.image;
        document.getElementById('tip-image').alt = randomTip.title;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (select.value === '') {
            alert('選択してください');
            return;
        }
        resultSection.style.display = 'block';
        loadingIndicator.style.display = 'flex';
        fetchFortune(select.value);
        // selectの選択されたオプションのテキストを取得する
        const selectedOptionText = select.options[select.selectedIndex].text;
        messageParagraph.textContent = `引いたのは「${select.value}」ね❤️占うから少し待ってちょうだい😉💕`;
        showRandomNoCodeStoryTip(); // Tipsを表示する
    });

    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // This function is called from main.js and interfaces with the OpenAI function
    async function fetchFortune(fortuneType) {
        const loadingIndicator = document.getElementById('loading-indicator');

        const arcanaList = ["The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor", "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit", "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance", "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgement", "The World"];
        const positionList = ["Upright", "Reversed"];
        const arcana = arcanaList[Math.floor(Math.random() * arcanaList.length)];
        const position = positionList[Math.floor(Math.random() * positionList.length)];

        try {
            const fortune = await fetchFortuneFromOpenAI({fortuneType, arcana, position});
            messageParagraph.textContent = fortune;
        } catch (error) {
            messageParagraph.textContent = 'Error: ' + error.message;
        } finally {
            loadingIndicator.style.display = 'none';
        }
    }
});
