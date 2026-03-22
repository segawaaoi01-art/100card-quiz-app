"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { poems, Poem } from "@/data/songs";
import CharacterView from "@/components/CharacterView";

const lyricsData: { id: number, text: string }[] = [
  {
    id: 1,
    text: `No.1 
秋の田の仮庵の庵の苫をあらみ わが衣手は露にぬれつつ
秋の田んぼにある仮の小屋、屋根の編み目が粗すぎて、私の袖はもう露でびしょ濡れだよ…。

No.2 
春過ぎて夏来にけらし白妙の 衣ほすてふ天の香具山 
あら、春が終わって、もう夏が来ちゃったみたい！
だって白い服を干してるってウワサの香具山が見えるもの。

No.3 
あしひきの山どりの尾のしだり尾の ながながし夜をひとりかもねむ 
山鳥の長い尾みたいに、すーっごく長い夜を、まさか私、一人で寝るのだろうか…？（寂しいな…）

No.4 
田子の浦にうちいでて見れば白妙の 富士の高嶺に雪はふりつつ
田子の浦まで出てきて見たら、真っ白な富士山のてっぺんに、雪がどんどん降ってるじゃないか！

No.5 
奥山に紅葉踏みわけ鳴く鹿の 声きく時ぞ秋は悲しき 
山奥で紅葉をガサガサ踏んで鳴いてる鹿の声を聞くと、あ〜あ、秋って切ないなぁって思うよ。

No.6 
かささぎのわたせる橋におく霜の 白きを見れば夜ぞふけにける 
かささぎが空に渡す橋が霜で真っ白なのを見ると、「もう夜中なんだな…」って感じるよ。

No.7 
天の原ふりさけ見れば春日なる 三笠の山に出でし月かも 
空を見上げて見ているこの美しい月は、きっと故郷の春日にある三笠山に出ていた月と同じ月なんだろうな。

No.8 
我が庵は都のたつみしかぞすむ 世を宇治山と人はいふなり 
私の家は都の南東にあって、静かに暮らしているの。世間の人たちは「あの人は世が嫌になって宇治の山に隠れ住んでいる」って噂してるけどね。

No.9 
花の色はうつりにけりないたづらに わが身世にふるながめせしまに 
桜の花の色は、むなしく衰え消えてしまったのね。まるで、この世で物思いにふけ、ぼんやりと雨を眺めている間に、私が年を取ってしまったように。

No.10 
これやこの行くも帰るも別れては 知るも知らぬも逢坂の関 
これがウワサの逢坂の関なんだね。これから行く人も帰る人も、知り合いも知らない人も、別れてはまた出会う場所って言われている、あの関所！`
  },
  {
    id: 2, text: `No.11
わたの原八十島かけて漕ぎ出でぬと 人にはつげよあまのつり舟
広い海の島々目指して船出したってことを、皆にちゃんと伝えてね！漁師さんの舟！

No.12
天津風雲の通ひ路吹きとぢよ をとめの姿しばしとどめむ
空の風さん、お願い！雲の帰り道を閉ざしてくれない？天女たちの姿を、もう少しだけ見ていたいんだ！

No.13
つくばねの峰よりおつるみなの川 恋ぞつもりて淵となりぬる
筑波山から流れる男女川みたいに、私の恋心もどんどん積もって、もう深い淵みたいになっちゃったよ。

No.14
陸奥のしのぶもぢずり誰ゆゑに 乱れそめにしわれならなくに
乱れ模様の染物みたいに、私の心は乱れてるけど、誰のせいでこんなになっちゃったと思う？

No.15
君がため春の野に出でて若菜つむ 我が衣手に雪はふりつつ
君のために春の野で若菜摘みしてるんだ。春なのに雪がチラチラ、私の袖にも降ってるよ。

No.16
立ち別れいなばの山の峰に生ふる まつとしきかば今かへり来む
お別れして因幡に行くけど、山に生える松みたいに「待ってるよ」って言われたら、すぐに帰ってくるからね！

No.17
千早ぶる神代もきかず龍田川 からくれなゐに水くくるとは
神様の時代にも聞いたことがないよ！竜田川が赤く染まって、水が絞り染めみたいになってるなんて、すごい！

No.18
住の江の岸による波よるさへや 夢の通ひ路人目よくらむ
岸に寄せる波みたいに毎日会いたいのに、夜の夢の中でまで、人目を気にして私に会ってくれないの？

No.19
難波潟みじかき芦のふしの間も あはでこの世を過ぐしてよとや
葦の節みたいにほんの短い時間さえ会わずに、私にこの一生を終えろって言うつもり？（少しでも会いたい！）

No.20
わびぬれば今はた同じ難波なる 身をつくしても逢はむとぞ思ふ
もう苦しくて、どうなっても同じことだ。難波のみおつくしじゃないけど、この身を捨ててでも、あなたに会いに行くって決めたよ！` },
  {
    id: 3, text: `No.21
今来むといひしばかりに長月の 有明の月を待ち出でつるかな
「今すぐ行く」って君が言ったから、九月の長い夜をずっと待ってたのに、結局夜明けの月を見ることになっちゃったよ。

No.22
吹くからに秋の草木のしをるれば むべ山風をあらしといふらむ
山風がひと吹きしただけで草木がしおれちゃうんだから、「山を荒らす風」で「嵐」って言うのも、なるほどね！

No.23
月見ればちぢにものこそ悲しけれ わが身ひとつの秋にはあらねど
月を見てると、あれこれ考えちゃってすごく悲しいよ。秋は私一人だけに来てるわけじゃないのにね。

No.24
このたびは幣も取りあへず手向山 紅葉のにしき神のまにまに
急な旅だったからお供え物を用意できなかったけど、代わりにこの手向山の美しい紅葉を、神様が望むままに受け取って！

No.25
名にしおはば逢坂山のさねかづら 人に知られでくるよしもがな
逢坂山のさねかづらの名前の通り、誰にもバレずに君にこっそり会いにいく方法があればいいのになぁ。

No.26
小倉山峰のもみぢ葉心あらば 今ひとたびのみゆき待たなむ
小倉山の紅葉さん、もし心があるなら、散るのを待って、もう一度だけ天皇のお出ましを待っていてよ！

No.27
みかの原わきて流るる泉川 いつみきとてか恋しかるらむ
泉川の「いつ」じゃないけど、いつ見たといって、この人のことをこんなに恋しく思ってるんだろう。（会ったこともないのに！）

No.28
山里は冬ぞさびしさまさりける 人めも草もかれぬと思へば
山里は冬になると特に寂しいよ。訪ねてくる人もいないし、草も全部枯れちゃったと思うとね。

No.29
心あてに折らばや折らむ 初霜のおきまどはせる白菊の花
「たぶんこれ！」って適当に折るしかないのかな。初霜が降りて、どれが霜で、どれが白菊か全然わからないよ！

No.30
有明のつれなく見えし別れより 暁ばかりうきものはなし
有明の月みたいに冷たい君と別れてから、夜明け前の暁ほどつらい時間は、もう他にないよ。` },
  {
    id: 4, text: `No.31
朝ぼらけ有明の月と見るまでに 吉野の里にふれる白雪
夜明けの頃、吉野の里に降ってる雪が、まるで有明の月みたいに真っ白で明るく見えるよ！

No.32
山川に風のかけたるしがらみは 流れもあへぬもみぢなりけり
山あいの川に、風がかけたみたいな柵（しがらみ）があるけど、あれは流れないで溜まってる紅葉だったんだね！

No.33
久かたの光のどけき春の日に しづ心なく花の散るらむ
お日様の光がこんなに穏やかな春の日なのに、どうして桜は落ち着きなく散っちゃうんだろうね。

No.34
誰をかも知る人にせむ高砂の 松もむかしの友ならなくに
誰を話し相手にしようかなあ。長生きの松で有名な高砂の松でさえ、昔からの友達じゃないんだから。

No.35
人はいさ心も知らずふるさとは 花ぞむかしの香ににほひける
人の心は変わっちゃったかもしれないけど、故郷の梅の花は昔と変わらない香りで咲いてるよ！

No.36
夏の夜はまだよひながら明けぬるを 雲のいづこに月やどるらむ
夏の夜って、まだ宵だと思ってたらもう夜が明けちゃったよ。月は雲のどこに隠れてるんだろうね？

No.37
白露に風の吹きしく秋の野は つらぬきとめぬ玉ぞ散りける
白露が風にしきりに吹かれて、秋の野原に糸で通してない宝石みたいにキラキラ散ってるよ。

No.38
忘らるる身をば思はず誓ひてし 人の命の惜しくもあるかな
忘れられちゃう私のことはどうでもいいけど、私を愛すると誓ったあの人が約束を破った罪で寿命が縮むのが惜しいよ。

No.39
浅茅生のをののしの原しのぶれど あまりてなどか人の恋しき
篠原の「しの」みたいに、我慢しているんだけど、どうしてこんなにあの人が恋しいんだろう！

No.40
しのぶれど色に出でにけりわが恋は ものや思ふと人の問ふまで
隠してたけど、とうとう顔色に出ちゃったみたい。私の恋は「恋しているの？」って人に聞かれるほどになってたんだ！` },
  {
    id: 5, text: `No.41
恋すてふわが名はまだき立ちにけり 人知れずこそ思ひそめしか
恋してるっていう私の噂が、もう広まっちゃったよ！
まだ誰にも内緒で思い始めたばかりだったのに！

No.42
契りきなかたみに袖をしぼりつつ 末の松山波こさじとは
約束したよね！お互いの袖を涙で絞りながら、「末の松山が波をかぶるなんて絶対にないように、心変わりはしない」って。

No.43 
逢ひ見ての後の心にくらぶれば 昔はものを思はざりけり
会えた後のこの恋心に比べたら、会う前なんて全然悩んでなかったんだなぁ。

No.44 
逢ふことの絶えてしなくはなかなかに 人をも身をも恨みざらまし
あなたに会うことが最初から全然なかったなら、かえって、あなたのことも自分の運命も恨んだりしなかっただろうに。

No.45 
あはれともいふべき人は思ほえで 身のいたづらになりぬべきかな
「かわいそうに」と同情してくれる人も思い浮かばないまま、私はむなしく消えてしまうことになるんだろうか。

No.46 
由良のとをわたる舟人かぢをたえ 行く方も知らぬ恋の道かな
由良の水門を渡る舟が舵をなくして、どこへ行くかもわからなくなっちゃったみたいな、先が見えない私の恋の道だなぁ。

No.47 
八重むぐらしげれる宿のさびしきに 人こそ見えね秋はきにけり
雑草が生い茂ってるこの寂しい家には、誰も訪ねてくる人は見えないけど、秋は来ちゃったんだね。

No.48 
風をいたみ岩うつ波のおのれのみ 砕けてものを思ふころかな
風が強くて、岩に打ちつける波が砕け散るように、私一人だけが恋に悩んで心が砕け散りそうな、今日この頃だよ。

No.49
御垣守衛士のたく火の夜はもえ 昼は消えつつものをこそ思へ
宮中の門を守る衛士の焚くかがり火が、夜は燃え、昼は消えるように、私も夜は燃えるような恋心で、昼はそれを隠してもの思いにふけっているよ。

No.50 
君がため惜しからざりし命さへ ながくもがなと思ひけるかな
あなたに会うためならどうなっても惜しくないこの命さえ、あなたと会えた今「長く続いてほしい」と願うようになっちゃったよ。` },
  {
    id: 6, text: `No.51 
かくとだにえやは伊吹のさしも草 さしも知らじな燃ゆる思ひを
「こんなに好き」とさえ言えずにいるんだから、伊吹山のさしも草みたいに私の心が燃えてるなんて、あなたは全然知らないでしょうね。

No.52
明けぬれば暮るるものとは知りながら なほ恨めしきあさぼらけかな
夜が明ければまた日が暮れて会える時間が来るって分かってるけど、やっぱり別れの朝は恨めしいよ！

No.53
歎きつつひとりぬる夜の明くる間は いかに久しきものとかは知る
嘆きながら一人で寝る夜、夜が明けるまでの時間がどれだけ長いか、あなたは知ってるの？（知らないでしょう！）

No.54
忘れじの行末までは難ければ 今日をかぎりの命ともがな
「忘れないで」なんて約束は遠い将来まで守るのは難しいだろうから、いっそ今日で私の命が尽きてほしいな。

No.55
滝の音は絶えて久しくなりぬれど 名こそ流れてなほ聞えけれ
その滝の音は途絶えてからもうずいぶん経つけれど、その名声だけは流れ伝わって、今もやっぱり聞こえてくるんだね。

No.56
あらざらむこの世のほかの思ひ出に 今ひとたびの逢ふこともがな
もうすぐしんじゃう私だけど、あの世へ持っていく思い出として、せめてもう一度、あなたに会いたいよ！

No.57
巡りあひて見しやそれともわかぬ間に 雲がくれにし夜半の月かな
やっと再会したのに、それがあなたかどうかも分からないうちに、雲に隠れてしまった夜中の月みたいに帰っちゃったんだね。

No.58
有馬山猪名のささ原風吹けば いでそよ人を忘れやはする
有馬山の笹原に風が吹いてそよそよ音を立てるけど、そうよ！私は決してあなたを忘れないよ！

No.59
やすらはで寝なましものを小夜更けて 傾くまでの月を見しかな
迷わずにさっさと寝てしまえばよかったのに！あなたを待っているうちに、夜が更けて月が沈むまで見ちゃったよ。

No.60
大江山いく野の道の遠ければ まだふみも見ず天の橋立
大江山を越えて生野へ行く道は遠すぎるから、天橋立には行ったこともないし、母からの手紙も見てないわよ！` },
  {
    id: 7, text: `No.61
いにしへの奈良の都の八重桜 今日九重に匂ひぬるかな
昔の奈良の都にあった八重桜が、今日は宮中でひときわ美しく咲いてるよ！

No.62
夜をこめて鳥のそら音ははかるとも 世に逢坂の関はゆるさじ
夜が明けないうちに鶏の鳴きマネでだまそうとしても、この逢坂の関は絶対に通さないからね！

No.63
今はただ思ひ絶えなむとばかりを 人づてならで言ふよしもがな
もうあなたのことをきっぱり諦めよう、というこの気持ちだけを、人づてじゃなくて、直接あなたに伝える方法があったらいいのに。

No.64
朝ぼらけ宇治の川霧たえだえに あらはれわたる瀬々の網代木
夜明けの宇治川の川霧がところどころ晴れてきて、浅瀬に仕掛けた網代木が顔を出してる景色、風情があるな。

No.65
恨みわびほさぬ袖だにあるものを 恋に朽ちなむ名こそ惜しけれ
あなたの冷たさを恨んで、涙で濡れて乾かない袖だけでも悔しいのに、この恋のせいで私の評判まで落ちちゃうのは本当に惜しいよ！

No.66
もろともにあはれと思へ山桜 花よりほかに知る人もなし
私と一緒に、この桜の美しさをしみじみと感じてくれよ、山桜。この山奥ではお前以外に心を分かってくれる人は誰もいないんだから。

No.67
春の夜の夢ばかりなる手枕に かひなく立たむ名こそ惜しけれ
春の夜の儚い夢みたいな短い逢瀬の手枕で、つまらない噂が立っちゃうなんて、もったいなくて悔しいわ。

No.68
心にもあらでうき世にながらへば 恋しかるべき夜半の月かな
本心じゃないのにつらい世の中に生き長らえてしまったら、寂しい時に恋しく思い出すだろうな、この夜中の月のこと。

No.69
あらし吹く三室の山のもみぢ葉は 龍田の川のにしきなりけり
嵐が吹き散らした三室の山の紅葉が、竜田川に一面に散ってる様子は、まるで錦の織物みたいにゴージャスだね！

No.70
寂しさに宿を立ち出でてながむれば いづこもおなじ秋の夕暮
寂しすぎて、家から外に出てあたりを眺めてみたけど、どこを見ても同じように寂しい、秋の夕暮れが広がってるだけだった。` },
  {
    id: 8, text: `No.71
夕されば門田の稲葉おとづれて 芦のまろやに秋風ぞ吹く
夕方になると、家の前の稲の葉がカサカサ音を立てて、この粗末な小屋に秋風が吹きつけてくるなぁ。

No.72
音にきく高師の浜のあだ波は かけじや袖の濡れもこそすれ
評判にきく高師の浜のいたずらな波みたいに、移り気なあなたには心をかけないようにしなくちゃ。袖が濡れることになったら嫌だから！

No.73
高砂の尾の上の桜咲きにけり 外山の霞たたずもあらなむ
高砂の峰に桜が咲いたみたいだから、手前の山の霞よ、どうか立たないで！桜を隠さないで！

No.74
うかりける人を初瀬の山おろしよ はげしかれとは祈らぬものを
冷たかったあの人が心変わりするように初瀬の観音様に祈ったのに、初瀬の山おろしよ、「もっと冷たくなれ」なんて祈ってないよ！

No.75
契りおきしさせもが露を命にて あはれ今年の秋も去ぬめり
あなたが約束した、させも草の露みたいな儚い言葉を命にしてたのに、ああ、今年の秋も終わっちゃうみたいだ。

No.76
わたの原漕ぎ出でて見れば久かたの 雲ゐにまがふ沖つ白波
大海原に船を漕ぎ出して見たら、遠い沖には、空の雲と見分けがつかない白い波が立ってるよ！

No.77
瀬をはやみ岩にせかるる滝川の われても末に逢はむとぞ思ふ
流れが速くて、岩にせき止められた急流が分かれても、最後は一緒になるように、私たちも最後には絶対に会えると思っているよ！

No.78
淡路島通ふ千鳥の鳴く声に 幾夜ねざめぬ須磨の関守
淡路島を行き来する千鳥の悲しい鳴き声で、須磨の関守は何度夜中に目を覚ましたことだろうか。

No.79
秋風にたなびく雲の絶え間より もれ出づる月の影のさやけさ
秋風にたなびく雲の切れ目から、漏れ出てくる月の光のなんと清らかで澄んでいることだろう。

No.80
ながからむ心も知らず黒髪の 乱れて今朝はものをこそ思へ
「ずっと愛してくれる」というあなたの本心がわからないまま、今朝は、乱れたこの黒髪みたいに心も乱れて、物思いにふけってしまうの。` },
  {
    id: 9, text: `No.81
ほととぎす鳴きつる方を眺むれば ただ有明の月ぞのこれる
ホトトギスが鳴いた方を見てみたけど、もう姿はなくて、夜明けの月が寂しく残ってるだけだったよ。

No.82
思ひわびさても命はあるものを 憂きに堪へぬは涙なりけり
恋に悩んで苦しいのに、命だけはどうにかあるけど、耐えきれないのは、とめどなく流れるこの涙だ。

No.83 
世の中よ道こそなけれ思ひ入る 山の奥にも鹿ぞ鳴くなる
世の中って逃げ道がないものだね。隠れようと思って奥深い山に入っても、鹿が悲しそうに鳴いているよ。

No.84
ながらへばまたこの頃やしのばれむ 憂しと見し世ぞ今は恋しき
このさき生き長らえたら、今のこのつらい日々も懐かしく思い出すのだろうか。昔つらいと思ってたことが、今は恋しいんだから。

No.85
夜もすがらもの思ふ頃は明けやらで ねやのひまさへつれなかりけり
一晩中悩み続けるこの頃は、なかなか夜が明けないし、寝室の隙間から漏れる夜明けの光も無くて冷たいよ。

No.86
なげけとて月やはものを思はする かこち顔なるわが涙かな
「嘆け」って月が私に物思いをさせてるの？まさか。本当は恋のせいなのに、月のせいにしてるみたいなこの涙。

No.87
むらさめの露もまだひぬまきの葉に 霧立のぼる秋の夕暮
にわか雨の露がまだ乾いてない槇の葉に、もう霧が立ち上ってる、寂しい秋の夕暮れだね。

No.88
難波江の芦のかりねの一夜ゆゑ 身をつくしてや恋ひわたるべき
難波江の葦を刈った根みたいな短い一夜の逢瀬のために、この身を滅ぼすほど恋し続けないといけないのかな。

No.89
玉の緒よ絶なば絶えねながらへば 忍ぶることのよわりもぞする
私の命よ、絶えるなら今すぐ絶えて！このまま生きてると、恋心が隠せなくなるかもしれないから。

No.90
見せばやな雄島のあまの袖だにも 濡れにぞ濡れし色は変らず
涙で色が変わった私の袖をあなたに見せてあげたいわ。雄島の漁師の袖でさえ、波に濡れ続けても色は変わらないのにね。` },
  {
    id: 10, text: `No.91
きりぎりす鳴くや霜夜のさむしろに 衣かたしきひとりかも寝む
コオロギが鳴く霜の降りる寒い夜に、冷たいむしろに自分の着物の袖だけ敷いて、私一人で寂しく寝るのかな。

No.92
わが袖は潮干にみえぬ沖の石の 人こそ知らね乾く間もなし
私の袖は、潮が引いても見えない沖の石みたいに、人は知らないけど、涙で濡れて乾くヒマがないの。

No.93
世の中は常にもがもな渚こぐ あまの小舟の綱手かなしも
世の中っていつまでも変わらないでほしいなぁ。渚を漕いでる漁師さんの小舟を綱で引く姿が、のどかで愛おしいから。

No.94
みよし野の山の秋風小夜ふけて ふるさと寒く衣うつなり
吉野の山の秋風が吹き、夜が更けていくと、昔の都だった里が寒くなって、砧で衣を打つ冬支度の音が聞こえてくるよ。

No.95
おほけなくうき世の民におほふかな わが立つ杣に墨染の袖
身のほどもわきまえない私だけど、つらい世の人々を包み込むように、比叡山に住む私の墨染めの袖をかけて皆を助けたい。

No.96
花さそふあらしの庭の雪ならで ふりゆくものは我が身なりけり
花を散らす嵐が庭に降らせたのは花の雪ではなくて、年をとる私自身だったんだね。

No.97
来ぬ人をまつほの浦の夕なぎに 焼くや藻塩の身もこがれつつ
来てくれない人を松帆の浦で待つ夕方、藻塩を焼く炎みたいに、私の身も恋しさで焦げ付いているよ。

No.98
風そよぐならの小川の夕暮は みそぎぞ夏のしるしなりける
風がそよそよ吹く楢の小川の夕暮れはもう秋みたいだけど、禊の行事を見ると、夏なんだなぁって気づくよ。

No.99
人も惜し人も恨めしあぢきなく 世を思ふゆゑにもの思ふ身は
人も愛しいし、人も恨めしい。つまらないけれど、この世のことで物思いにふける私なんだ。

No.100
百敷や古き軒端のしのぶにも なほあまりある昔なりけり
宮中の古びた軒先に生えた忍ぶ草を見て、偲んでも偲びきれないのは、昔の良い時代のことだよ。` }
];

/**
 * 札（取札）用のテキスト整形：5文字ずつで区切り、枠内に収める
 */
const formatCardText = (text: string) => {
  const noSpace = text.replace(/[\s　]/g, '');
  const chunks = [];
  for (let i = 0; i < noSpace.length; i += 5) {
    let chunk = noSpace.slice(i, i + 5);
    if (noSpace.slice(i + 5, i + 6).length > 0 && noSpace.slice(i + 5).length === 1) {
      chunk += noSpace.slice(i + 5);
      i += 1;
    }
    chunks.push(chunk);
  }
  return chunks.join('\n');
};

/**
 * 雅な表示（上の句・答え）用のテキスト整形：1本に繋げる（空白削除）
 */
const formatPoemText = (text: string) => {
  return text.trim().replace(/[\s　]+/g, '');
};

type GameState = "TOP" | "COUNTDOWN" | "CHOICE" | "RESULT" | "MUSIC_SELECT" | "MUSIC_DETAIL";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("TOP");
  const [currentPoem, setCurrentPoem] = useState<Poem | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [choices, setChoices] = useState<{ text: string; hiragana: string; disabled: boolean }[]>([]);
  const [remainingPoemIds, setRemainingPoemIds] = useState<number[]>([]);
  const [currentGroup, setCurrentGroup] = useState("");
  const [selectedMusicIndex, setSelectedMusicIndex] = useState<number | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<{ text: string; hiragana: string } | null>(null);
  const [comboCount, setComboCount] = useState(0);

  // プレイヤー用
  const [playerGroupPoems, setPlayerGroupPoems] = useState<Poem[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isQuizAudioEnabled, setIsQuizAudioEnabled] = useState(true);
  const [isPlayerAudioEnabled, setIsPlayerAudioEnabled] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rangeRef = useRef<HTMLInputElement | null>(null);
  const [activePopoverId, setActivePopoverId] = useState<number | null>(null);

  const pauseMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  }, []);

  const stopMusicAndReset = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const playMusic = useCallback((index: number) => {
    if (!isPlayerAudioEnabled) {
      console.log("Audio is disabled. Skipping music playback.");
      return;
    }

    // 既に該当するオーディオが存在する場合はそれを使う
    let audio = audioRef.current;
    if (!audio || !audio.src.includes(`music${index}.mp3`)) {
      console.log(`Creating new music instance: /sounds/music${index}.mp3`);
      audio = new Audio(`/sounds/music${index}.mp3`);
      audio.volume = 0.8;
      audioRef.current = audio;

      const currentAudio = audio;
      currentAudio.onloadedmetadata = () => {
        setDuration(currentAudio.duration);
      };

      currentAudio.ontimeupdate = () => {
        setCurrentTime(currentAudio.currentTime);
      };

      currentAudio.onended = () => {
        setIsPlaying(false);
      };
    }

    if (audio) {
      audio.play().catch(err => console.error("Music play error:", err));
      setIsPlaying(true);
    }
  }, [isPlayerAudioEnabled]);

  const playQuizAudio = useCallback((id: number, type: 'q' | 'a') => {
    stopMusicAndReset();
    if (!isQuizAudioEnabled) {
      console.log("Audio is disabled. Skipping quiz audio.");
      return;
    }

    try {
      console.log(`Starting quiz audio: /sounds/${id}_${type}.mp3`);
      const audio = new Audio(`/sounds/${id}_${type}.mp3`);
      audio.volume = 0.8;
      audioRef.current = audio;

      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn(`Audio playback failed for /sounds/${id}_${type}.mp3:`, error);
          setIsPlaying(false);
          // エラー時でもシーク可能にするために audioRef は保持する
        });
      }

      setIsPlaying(true);

      audio.onended = () => {
        setIsPlaying(false);
        // 終了後もシーク可能にするために audioRef は保持する
      };

      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };

      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };

      audio.onerror = (e) => {
        console.warn(`Audio loading error for /sounds/${id}_${type}.mp3:`, e);
        setIsPlaying(false);
        audioRef.current = null;
      };
    } catch (err) {
      console.warn("Unexpected audio error:", err);
      setIsPlaying(false);
    }
  }, [stopMusicAndReset, isQuizAudioEnabled]);

  const handleGoTop = useCallback(() => {
    setGameState("TOP");
    setComboCount(0);
    stopMusicAndReset();
  }, [stopMusicAndReset]);

  const nextQuestion = useCallback(() => {
    if (remainingPoemIds.length === 0) {
      handleGoTop();
      return;
    }

    const nextIds = [...remainingPoemIds];
    const randomIndex = Math.floor(Math.random() * nextIds.length);
    const targetId = nextIds.splice(randomIndex, 1)[0];
    const poem = poems.find((p) => p.id === targetId) || null;

    setRemainingPoemIds(nextIds);
    setCurrentPoem(poem);
    setGameState("CHOICE");

    if (poem) {
      prepareChoices(poem);
    }
  }, [remainingPoemIds, handleGoTop]);

  const startQuizWithMode = (startId: number, audioEnabled: boolean) => {
    stopMusicAndReset();
    setIsQuizAudioEnabled(audioEnabled);
    const groupName = `${startId}-${startId + 9}`;
    setCurrentGroup(groupName);
    const groupPoemIds = poems
      .filter((p) => p.id >= startId && p.id < startId + 10)
      .map((p) => p.id);

    const nextIds = [...groupPoemIds];
    const randomIndex = Math.floor(Math.random() * nextIds.length);
    const targetId = nextIds.splice(randomIndex, 1)[0];
    const poem = poems.find((p) => p.id === targetId) || null;

    setRemainingPoemIds(nextIds);
    setCurrentPoem(poem);
    setGameState("COUNTDOWN");
    setCountdown(3);
    setComboCount(0);
    setActivePopoverId(null);
    setSelectedChoice(null); // Reset selection
  };

  const selectMusicDetail = (index: number) => {
    stopMusicAndReset();
    const startId = (index - 1) * 10 + 1;
    const groupPoems = poems.filter((p) => p.id >= startId && p.id < startId + 10);
    setPlayerGroupPoems(groupPoems);
    setCurrentGroup(`${startId}-${startId + 9}`);
    setSelectedMusicIndex(index);
    setGameState("MUSIC_DETAIL");
    setIsPlaying(false);

    // 事前ロード
    const audio = new Audio(`/sounds/music${index}.mp3`);
    audio.volume = 0.8;
    const currentAudio = audio;
    audioRef.current = currentAudio;
    currentAudio.onloadedmetadata = () => {
      setDuration(currentAudio.duration);
    };
    currentAudio.ontimeupdate = () => {
      setCurrentTime(currentAudio.currentTime);
    };
    currentAudio.onended = () => {
      setIsPlaying(false);
    };
  };

  // 音声設定のデバッグログ
  useEffect(() => {
    console.log("Audio settings changed:", { isQuizAudioEnabled, isPlayerAudioEnabled });
  }, [isQuizAudioEnabled, isPlayerAudioEnabled]);

  useEffect(() => {
    if (gameState === "COUNTDOWN") {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setGameState("CHOICE");
        if (currentPoem) {
          prepareChoices(currentPoem);
        }
      }
    }
  }, [gameState, countdown, currentPoem]);

  // ポップオーバーを閉じるためのグローバルクリックイベント
  useEffect(() => {
    const handleClickOutside = () => setActivePopoverId(null);
    if (activePopoverId !== null) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => window.removeEventListener("click", handleClickOutside);
  }, [activePopoverId]);

  // 音声再生/停止のライフサイクル管理 (ユーザーの指示に基づき整理)
  useEffect(() => {
    // クイズ中の音声自動再生
    if (currentPoem) {
      if (isQuizAudioEnabled) {
        if (gameState === "CHOICE") {
          playQuizAudio(currentPoem.id, 'q');
        } else if (gameState === "RESULT") {
          playQuizAudio(currentPoem.id, 'a');
        }
      } else {
        console.log("isQuizAudioEnabled is false. Stopping any current audio.");
        stopMusicAndReset();
      }
    }

    // 音楽詳細画面での停止制御 (オーディオ再生中であれば)
    if (!isPlayerAudioEnabled && gameState === "MUSIC_DETAIL") {
      pauseMusic();
    }
  }, [isQuizAudioEnabled, isPlayerAudioEnabled, currentPoem?.id, gameState, playQuizAudio, pauseMusic, stopMusicAndReset]);

  // 画面非表示（バックグラウンド）時の音声停止機能
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        pauseMusic();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pauseMusic]);

  const prepareChoices = (targetPoem: Poem) => {
    const otherPoems = poems.filter((p) => p.id !== targetPoem.id);
    const shuffledOthers = [...otherPoems].sort(() => 0.5 - Math.random());
    const initialChoices = [
      { text: targetPoem.shimoNoKu, hiragana: targetPoem.reading.shimo, disabled: false },
      { text: shuffledOthers[0].shimoNoKu, hiragana: shuffledOthers[0].reading.shimo, disabled: false },
      { text: shuffledOthers[1].shimoNoKu, hiragana: shuffledOthers[1].reading.shimo, disabled: false },
      { text: shuffledOthers[2].shimoNoKu, hiragana: shuffledOthers[2].reading.shimo, disabled: false },
    ].sort(() => 0.5 - Math.random());
    setChoices(initialChoices);
  };

  const handleChoice = (choiceText: string, choiceHiragana: string) => {
    if (!currentPoem) return;
    if (choiceText === currentPoem.shimoNoKu) {
      console.log("Correct answer! Switching to RESULT state.");
      setSelectedChoice({ text: choiceText, hiragana: choiceHiragana });
      setComboCount(prev => prev + 1);
      setGameState("RESULT");
    } else {
      setComboCount(0);
      setChoices(prev => prev.map(c => c.text === choiceText ? { ...c, disabled: true } : c));
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-4 pt-6 pb-12 md:p-8 md:pt-10 relative z-10 text-center">
      {/* ゲームタイトル */}
      <div className="flex flex-col items-center mb-4">
        <div className="border-t-2 border-b-2 border-white/30 py-2 px-6">
          <h1 className="text-xl md:text-2xl font-bold tracking-widest text-[#f8fbf8] drop-shadow-sm text-center">
            曲で覚える百人一首
          </h1>
        </div>
      </div>

      {/* SNS風キャラクターパーツ */}
      <CharacterView
        type={
          gameState === "TOP" ? "top" :
            (gameState === "MUSIC_SELECT" || gameState === "MUSIC_DETAIL") ? "trivia" :
              (gameState === "COUNTDOWN" || gameState === "CHOICE") ? "preQuiz" :
                (gameState === "RESULT" && comboCount >= 2) ? "combo" : "top"
        }
        customMessage={gameState === "COUNTDOWN" ? `こちらは ${currentGroup} 首です。準備はいいですか？` : undefined}
        trigger={gameState === "RESULT" ? `result-${comboCount}` : currentPoem?.id}
      />

      <div className="w-full max-w-2xl flex flex-col items-center">
        {gameState === "TOP" && (
          <div className="flex flex-col items-center w-full animate-fade-in relative">
            {/* 曲を聴くボタン (デザインをクイズボタンと統一) */}
            <button
              onClick={() => {
                setGameState("MUSIC_SELECT");
                stopMusicAndReset();
              }}
              className="w-full py-2.5 text-lg font-bold bg-white/80 text-[#1c305c] rounded-full shadow-sm hover:bg-[#c1e4e9]/30 transition-colors mb-8 border border-white flex items-center justify-center gap-2"
            >
              <span className="text-xl">♪</span> 曲を聴く
            </button>

            {/* クイズ用グループボタン (復元) */}
            <div className="flex flex-col items-center mb-4">
              <div className="border-t-2 border-b-2 border-[#bce2e8]/50 py-1 px-4">
                <h2 className="text-[#83ccd2]/60 font-bold text-center text-lg">
                  百人一首四択クイズ
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full">
              {Array.from({ length: 10 }).map((_, i) => {
                const startId = i * 10 + 1;
                return (
                  <div key={i} className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePopoverId(activePopoverId === startId ? null : startId);
                      }}
                      className="w-full rounded-xl bg-white/80 px-2 py-3 text-lg font-bold text-[#1c305c] hover:bg-[#c1e4e9]/30 shadow-sm border border-white transition-all transform active:scale-95"
                    >
                      {startId}-{startId + 9}
                    </button>

                    {activePopoverId === startId && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-[#bce2e8]/30 z-[100] overflow-hidden animate-fade-in">
                        <button
                          onClick={() => startQuizWithMode(startId, true)}
                          className="w-full py-3 px-4 text-base font-bold text-[#1c305c] hover:bg-[#f6bfbc]/20 transition-colors border-b border-gray-50 flex items-center justify-center gap-2"
                        >
                          <span className="text-xl">♪</span> 音声あり
                        </button>
                        <button
                          onClick={() => startQuizWithMode(startId, false)}
                          className="w-full py-3 px-4 text-base font-bold text-[#1c305c]/60 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                        >
                          <span className="text-xl">🔇</span> 音声なし
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {gameState === "MUSIC_SELECT" && (
          <div className="flex flex-col items-center gap-6 w-full animate-fade-in relative bg-white/80 p-8 rounded-3xl shadow-lg border border-white">
            <button
              onClick={handleGoTop}
              className="absolute top-[10px] right-[10px] text-2xl text-[#1c305c]/30 hover:text-[#1c305c] transition-colors z-50 font-bold"
              aria-label="トップに戻る"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-[#1c305c] mb-2">曲をえらぶ</h2>
            <div className="grid grid-cols-2 gap-4 w-full">
              {Array.from({ length: 10 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => selectMusicDetail(i + 1)}
                  className="rounded-2xl bg-white px-4 py-5 text-xl font-bold text-[#1c305c] hover:bg-[#c1e4e9]/30 shadow-sm border border-white"
                >
                  <span className="block text-sm opacity-40 mb-1">music {i + 1}</span>
                  {i * 10 + 1}-{i * 10 + 10} 首
                </button>
              ))}
            </div>

            {/* YouTubeへの誘導リンク */}
            <div className="mt-8 pt-4 border-t border-[#bce2e8]/30 text-center w-full">
              <a
                href="https://youtube.com/playlist?list=PLvvZN1nyBaxzeWhfz9BkbIyLdz_1RoNXD&si=RaByd2gGnAuywsa_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors inline-flex items-center justify-center gap-1"
              >
                <span>YouTubeで曲を聴きたい人はこちら</span>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        )}

        {gameState === "MUSIC_DETAIL" && (
          <div className="flex flex-col items-center w-full bg-white/80 p-6 md:p-10 rounded-3xl shadow-lg border border-white animate-fade-in relative">
            <button
              onClick={() => {
                setGameState("MUSIC_SELECT");
                stopMusicAndReset();
              }}
              className="absolute top-[10px] right-[16px] text-2xl text-[#1c305c]/30 hover:text-[#1c305c] transition-colors z-50 font-bold"
              aria-label="戻る"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-8 text-[#1c305c] border-b-2 border-[#f6bfbc] pb-2 text-center w-full">
              {currentGroup}首
            </h2>

            {/* 再生バー (シークバー) */}
            <div className="w-full mb-8 px-4">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) => {
                  const time = parseFloat(e.target.value);
                  setCurrentTime(time);

                  // 既にaudioRef.currentがあるはず(事前ロード済み)
                  if (audioRef.current) {
                    audioRef.current.currentTime = time;
                  }
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#89c3eb]"
              />
              <div className="flex justify-between text-xs text-[#1c305c]/40 mt-1">
                <span>{Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')}</span>
                <span>{Math.floor(duration / 60)}:{(Math.floor(duration % 60)).toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* 楽曲コントロール (再生・停止) */}
            <div className="flex items-center gap-8 md:gap-12 mb-10">
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => selectedMusicIndex && playMusic(selectedMusicIndex)}
                  className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full text-white shadow-lg transition-all
                      ${isPlaying ? "bg-gray-200 cursor-not-allowed" : "bg-[#89c3eb] hover:bg-[#78b1d6] active:scale-95 active:bg-[#679fc1]"}
                    `}
                  disabled={isPlaying}
                  aria-label="再生"
                >
                  <svg className="w-8 h-8 md:w-10 md:h-10 fill-current ml-1" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={pauseMusic}
                  className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full text-white shadow-lg transition-all
                      ${!isPlaying ? "bg-gray-200 cursor-not-allowed" : "bg-[#f6bfbc] hover:bg-[#e5adab] active:scale-95 active:bg-[#d49c9a]"}
                    `}
                  disabled={!isPlaying}
                  aria-label="一時停止"
                >
                  <svg className="w-8 h-8 md:w-10 md:h-10 fill-current" viewBox="0 0 24 24">
                    <path d="M6 6h12v12H6z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="w-full flex flex-col gap-8 max-h-[50vh] overflow-y-auto pr-2 mb-8 bg-white/60 pl-10 pr-12 py-8 rounded-xl text-[#1c305c] leading-relaxed whitespace-pre-wrap text-left shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-white/20">
              {selectedMusicIndex ? lyricsData.find(d => d.id === selectedMusicIndex)?.text : ""}
            </div>
          </div>
        )}



        {gameState === "COUNTDOWN" && (
          <div className="flex flex-col items-center justify-center h-64 relative w-full">
            <div className="text-[10rem] font-bold text-[#1c305c]/20 animate-pulse">
              {countdown}
            </div>
          </div>
        )}

        {(gameState === "CHOICE" || gameState === "RESULT") && currentPoem && (
          <div className="flex flex-col items-center w-full bg-white/60 p-6 md:p-12 rounded-3xl backdrop-blur-sm animate-fade-in relative shadow-sm border border-white">
            <button
              onClick={handleGoTop}
              className="absolute top-[10px] right-[10px] text-2xl text-[#1c305c]/30 hover:text-[#1c305c] transition-colors z-50 font-bold"
              aria-label="トップに戻る"
            >
              ✕
            </button>

            <div className="flex flex-col items-center w-full text-[#1c305c] mb-6">
              <div className="text-xs md:text-sm text-[#1c305c]/60 mb-2 tracking-widest font-normal">
                第 {currentPoem.id} 首
              </div>
              <div className="w-full flex flex-col items-center gap-2 px-6 overflow-hidden">
                <p
                  className="text-[clamp(1rem,4.5vw,1.5rem)] sm:text-2xl font-bold font-serif whitespace-nowrap text-center max-w-full overflow-hidden"
                >
                  {formatPoemText(currentPoem.kamiNoKu)}
                </p>
                {gameState === "RESULT" && (
                  <p
                    className="text-[clamp(1rem,4.5vw,1.5rem)] sm:text-2xl font-bold font-serif whitespace-nowrap text-[#89c3eb] animate-fade-in text-center max-w-full overflow-hidden"
                  >
                    {formatPoemText(currentPoem.shimoNoKu)}
                  </p>
                )}
              </div>
              {gameState === "RESULT" && (
                <p className="text-base text-[#1c305c]/50 animate-fade-in font-normal mt-3">
                  作者：{currentPoem.author}
                </p>
              )}
            </div>

            {gameState === "CHOICE" && (
              <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-[320px] mx-auto px-2">
                {choices.map((choice, index) => {
                  const displayText = formatCardText(choice.hiragana);
                  return (
                    <button
                      key={index}
                      disabled={choice.disabled}
                      onClick={() => handleChoice(choice.text, choice.hiragana)}
                      className={`rounded-2xl transition-all shadow-md border border-[#333]/10 overflow-hidden aspect-square flex flex-col justify-center items-center p-1 relative ${choice.disabled
                        ? "bg-gray-100 text-gray-300 cursor-not-allowed opacity-50 border-transparent shadow-none"
                        : "bg-white text-[#333] hover:bg-[#fdeff2] active:scale-95 active:bg-gray-50 hover:shadow-lg"
                        }`}
                    >
                      <span
                        className="font-serif font-light text-base sm:text-lg leading-snug tracking-normal"
                        style={{
                          writingMode: "vertical-rl",
                          textAlign: "left",
                          display: "block",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {displayText}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {gameState === "RESULT" && (
              <div className="w-full flex flex-col items-center mt-6">
                {selectedChoice && (
                  <div className="mb-8 flex justify-center w-full">
                    {(() => {
                      const displayText = formatCardText(selectedChoice.hiragana);
                      return (
                        <div
                          className="rounded-2xl shadow-md border border-[#333]/10 bg-white text-[#333] overflow-hidden aspect-square flex flex-col justify-center items-center p-1 w-full max-w-[140px]"
                        >
                          <span
                            className="font-serif font-light text-base sm:text-lg leading-snug tracking-normal"
                            style={{
                              writingMode: "vertical-rl",
                              textAlign: "left",
                              display: "block",
                              whiteSpace: "pre-line",
                            }}
                          >
                            {displayText}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                )}
                <div className="w-full flex flex-col gap-4 items-center text-center mt-4 mb-6">
                  {remainingPoemIds.length > 0 ? (
                    <button
                      onClick={nextQuestion}
                      className="w-full py-2.5 text-lg font-bold bg-[#89c3eb] text-white rounded-2xl shadow-md hover:bg-[#7ab3db] transition-colors"
                    >
                      次の問題へ
                    </button>
                  ) : (
                    <button
                      onClick={handleGoTop}
                      className="w-2/3 py-2.5 text-lg font-bold text-[#8c7042] bg-[#f7e7ce] rounded-full shadow-sm hover:bg-[#efe0c5] transition-all border border-[#d4af37]/30"
                    >
                      10首クリア！
                    </button>
                  )}
                </div>
              </div>
            )}


          </div>
        )}
      </div>
    </main>
  );
}
