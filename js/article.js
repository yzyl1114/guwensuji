// 文章数据 - 岳阳楼记示例（移除拼音中的标点符号）
const articles = {
    1: {
        title: "滕王阁序",
        author: "唐 · 王勃",
        location: "江西南昌滕王阁",
        content: `豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯。
时维九月，序属三秋。潦水尽而寒潭清，烟光凝而暮山紫。俨骖騑于上路，访风景于崇阿；临帝子之长洲，得天人之旧馆。层峦耸翠，上出重霄；飞阁流丹，下临无地。鹤汀凫渚，穷岛屿之萦回；桂殿兰宫，即冈峦之体势。披绣闼，俯雕甍，山原旷其盈视，川泽纡其骇瞩。闾阎扑地，钟鸣鼎食之家；舸舰弥津，青雀黄龙之舳。云销雨霁，彩彻区明。落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨；雁阵惊寒，声断衡阳之浦。
遥襟甫畅，逸兴遄飞。爽籁发而清风生，纤歌凝而白云遏。睢园绿竹，气凌彭泽之樽；邺水朱华，光照临川之笔。四美具，二难并。穷睇眄于中天，极娱游于暇日。天高地迥，觉宇宙之无穷；兴尽悲来，识盈虚之有数。望长安于日下，目吴会于云间。地势极而南溟深，天柱高而北辰远。关山难越，谁悲失路之人？萍水相逢，尽是他乡之客。怀帝阍而不见，奉宣室以何年？
嗟乎！时运不齐，命途多舛。冯唐易老，李广难封。屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子见机，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接；东隅已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！
勃，三尺微命，一介书生。无路请缨，等终军之弱冠；有怀投笔，慕宗悫之长风。舍簪笏于百龄，奉晨昏于万里。非谢家之宝树，接孟氏之芳邻。他日趋庭，叨陪鲤对；今兹捧袂，喜托龙门。杨意不逢，抚凌云而自惜；钟期既遇，奏流水以何惭？
呜呼！胜地不常，盛筵难再；兰亭已矣，梓泽丘墟。临别赠言，幸承恩于伟饯；登高作赋，是所望于群公。敢竭鄙怀，恭疏短引；一言均赋，四韵俱成。请洒潘江，各倾陆海云尔：
滕王高阁临江渚，佩玉鸣鸾罢歌舞。画栋朝飞南浦云，珠帘暮卷西山雨。闲云潭影日悠悠，物换星移几度秋。阁中帝子今何在？槛外长江空自流。`,
        pinyin: `yù zhāng gù jùn hóng dū xīn fǔ xīng fēn yì zhěn dì jiē héng lú jīn sān jiāng ér dài wǔ hú kòng mán jīng ér yǐn ōu yuè wù huá tiān bǎo lóng guāng shè niú dǒu zhī xū rén jié dì líng xú rú xià chén fān zhī tà xióng zhōu wù liè jùn cǎi xīng chí tái huáng zhěn yí xià zhī jiāo bīn zhǔ jìn dōng nán zhī měi dū dū yán gōng zhī yǎ wàng qǐ jǐ yáo lín yǔ wén xīn zhōu zhī yì fàn chān wéi zàn zhù shí xún xiū jià shèng yǒu rú yún qiān lǐ féng yíng gāo péng mǎn zuò téng jiāo qǐ fèng mèng xué shì zhī cí zōng zǐ diàn qīng shuāng wáng jiāng jūn zhī wǔ kù jiā jūn zuò zǎi lù chū míng qū tóng zǐ hé zhī gōng féng shèng jiàn shí wéi jiǔ yuè xù shǔ sān qiū lǎo shuǐ jìn ér hán tán qīng yān guāng níng ér mù shān zǐ yǎn cān fēi yú shàng lù fǎng fēng jǐng yú chóng ē lín dì zǐ zhī cháng zhōu dé tiān rén zhī jiù guǎn céng luán sǒng cuì shàng chū chóng xiāo fēi gé liú dān xià lín wú dì hè tīng fú zhǔ qióng dǎo yǔ zhī yíng huí guì diàn lán gōng jí gāng luán zhī tǐ shì pī xiù tà fǔ diāo méng shān yuán kuàng qí yíng shì chuān zé yū qí hài zhǔ lǘ yán pū dì zhōng míng dǐng shí zhī jiā gě jiàn mí jīn qīng què huáng lóng zhī zhú yún xiāo yǔ jì cǎi chè qū míng luò xiá yǔ gū wù qí fēi qiū shuǐ gòng cháng tiān yī sè yú zhōu chàng wǎn xiǎng qióng péng lǐ zhī bīn yàn zhèn jīng hán shēng duàn héng yáng zhī pǔ yáo jīn fǔ chàng yì xìng chuán fēi shuǎng lài fā ér qīng fēng shēng xiān gē níng ér bái yún è suī yuán lǜ zhú qì líng péng zé zhī zūn yè shuǐ zhū huá guāng zhào lín chuān zhī bǐ sì měi jù èr nán bìng qióng dì miǎn yú zhōng tiān jí yú yóu yú xiá rì tiān gāo dì jiǒng jué yǔ zhòu zhī wú qióng xìng jìn bēi lái shí yíng xū zhī yǒu shù wàng cháng ān yú rì xià mù wú kuài yú yún jiān dì shì jí ér nán míng shēn tiān zhù gāo ér běi chén yuǎn guān shān nán yuè shéi bēi shī lù zhī rén píng shuǐ xiāng féng jìn shì tā xiāng zhī kè huái dì hūn ér bù jiàn fèng xuān shì yǐ hé nián jiē hū shí yùn bù qí mìng tú duō chuǎn féng táng yì lǎo lǐ guǎng nán fēng qū jiǎ yì yú cháng shā fēi wú shèng zhǔ cuàn liáng hóng yú hǎi qǔ qǐ fá míng shí suǒ lài jūn zǐ jiàn jī dá rén zhī mìng lǎo dāng yì zhuàng nìng yí bái shǒu zhī xīn qióng qiě yì jiān bù zhuì qīng yún zhī zhì zhuó tān quán ér jué shuǎng chù hé zhé yǐ yóu huān běi hǎi suī shē fú yáo kě jiē dōng yú yǐ shì sāng yú fēi wǎn mèng cháng gāo jié kōng yú bào guó zhī qíng ruǎn jí chāng kuáng qǐ xiào qióng tú zhī kū bó sān chǐ wēi mìng yī jiè shū shēng wú lù qǐng yīng děng zhōng jūn zhī ruò guàn yǒu huái tóu bǐ mù zōng què zhī cháng fēng shě zān hù yú bǎi líng fèng chén hūn yú wàn lǐ fēi xiè jiā zhī bǎo shù jiē mèng shì zhī fāng lín tā rì qū tíng tāo péi lǐ duì jīn zī pěng mèi xǐ tuō lóng mén yáng yì bù féng fǔ líng yún ér zì xī zhōng qī jì yù zòu liú shuǐ yǐ hé cán wū hū shèng dì bù cháng shèng yàn nán zài lán tíng yǐ yǐ zǐ zé qiū xū lín bié zèng yán xìng chéng ēn yú wěi jiàn dēng gāo zuò fù shì suǒ wàng yú qún gōng gǎn jié bǐ huái gōng shū duǎn yǐn yī yán jūn fù sì yùn jù chéng qǐng sǎ pān jiāng gè qīng lù hǎi yún ěr téng wáng gāo gé lín jiāng zhǔ pèi yù míng luán bà gē wǔ huà dòng cháo fēi nán pǔ yún zhū lián mù juǎn xī shān yǔ xián yún tán yǐng rì yōu yōu wù huàn xīng yí jǐ dù qiū gé zhōng dì zǐ jīn hé zài kǎn wài cháng jiāng kōng zì liú`
    },
    2: {
        title: "岳阳楼记",
        author: "宋 · 范仲淹", 
        location: "湖南岳阳岳阳楼",
        content: `庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废具兴。乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上。属予作文以记之。
予观夫巴陵胜状，在洞庭一湖。衔远山，吞长江，浩浩汤汤，横无际涯；朝晖夕阴，气象万千。此则岳阳楼之大观也，前人之述备矣。然则北通巫峡，南极潇湘，迁客骚人，多会于此，览物之情，得无异乎？
若夫淫雨霏霏，连月不开，阴风怒号，浊浪排空；日星隐曜，山岳潜形；商旅不行，樯倾楫摧；薄暮冥冥，虎啸猿啼。登斯楼也，则有去国怀乡，忧谗畏讥，满目萧然，感极而悲者矣。
至若春和景明，波澜不惊，上下天光，一碧万顷；沙鸥翔集，锦鳞游泳；岸芷汀兰，郁郁青青。而或长烟一空，皓月千里，浮光跃金，静影沉璧，渔歌互答，此乐何极！登斯楼也，则有心旷神怡，宠辱偕忘，把酒临风，其喜洋洋者矣。
嗟夫！予尝求古仁人之心，或异二者之为，何哉？不以物喜，不以己悲；居庙堂之高则忧其民；处江湖之远则忧其君。是进亦忧，退亦忧。然则何时而乐耶？其必曰“先天下之忧而忧，后天下之乐而乐”乎。噫！微斯人，吾谁与归？
时六年九月十五日。`,
        pinyin: `qìng lì sì nián chūn téng zǐ jīng zhé shǒu bā líng jùn yuè míng nián zhèng tōng rén hé bǎi fèi jù xìng nǎi chóng xiū yuè yáng lóu zēng qí jiù zhì kè táng xián jīn rén shī fù yú qí shàng shǔ yǔ zuò wén yǐ jì zhī yǔ guān fū bā líng shèng zhuàng zài dòng tíng yī hú xián yuǎn shān tūn cháng jiāng hào hào shāng shāng héng wú jì yá cháo huī xī yīn qì xiàng wàn qiān cǐ zé yuè yáng lóu zhī dà guān yě qián rén zhī shù bèi yǐ rán zé běi tōng wū xiá nán jí xiāo xiāng qiān kè sāo rén duō huì yú cǐ lǎn wù zhī qíng dé wú yì hū ruò fū yín yǔ fēi fēi lián yuè bù kāi yīn fēng nù háo zhuó làng pái kōng rì xīng yǐn yào shān yuè qián xíng shāng lǚ bù xíng qiáng qīng jí cuī bó mù míng míng hǔ xiào yuán tí dēng sī lóu yě zé yǒu qù guó huái xiāng yōu chán wèi jī mǎn mù xiāo rán gǎn jí ér bēi zhě yǐ zhì ruò chūn hé jǐng míng bō lán bù jīng shàng xià tiān guāng yī bì wàn qǐng shā ōu xiáng jí jǐn lín yóu yǒng àn zhǐ tīng lán yù yù qīng qīng ér huò cháng yān yī kōng hào yuè qiān lǐ fú guāng yuè jīn jìng yǐng chén bì yú gē hù dá cǐ lè hé jí dēng sī lóu yě zé yǒu xīn kuàng shén yí chǒng rǔ xié wàng bǎ jiǔ lín fēng qí xǐ yáng yáng zhě yǐ jiē fū yǔ cháng qiú gǔ rén rén zhī xīn huò yì èr zhě zhī wèi hé zāi bù yǐ wù xǐ bù yǐ jǐ bēi jū miào táng zhī gāo zé yōu qí mín chǔ jiāng hú zhī yuǎn zé yōu qí jūn shì jìn yì yōu tuì yì yōu rán zé hé shí ér lè yē qí bì yuē xiān tiān xià zhī yōu ér yōu hòu tiān xià zhī lè ér lè hū yī wēi sī rén wú shuí yǔ guī shí liù nián jiǔ yuè shí wǔ rì`
    },
    3: {
        title: "黄鹤楼诗三首",
        author: "唐 · 崔颢 李白",
        location: "湖北武汉黄鹤楼", 
        content: `黄鹤楼（崔颢）
昔人已乘黄鹤去，此地空余黄鹤楼。
黄鹤一去不复返，白云千载空悠悠。
晴川历历汉阳树，芳草萋萋鹦鹉洲。
日暮乡关何处是？烟波江上使人愁。

黄鹤楼送孟浩然之广陵（李白）
故人西辞黄鹤楼，烟花三月下扬州。
孤帆远影碧空尽。惟见长江天际流。

与史郎中钦听黄鹤楼上吹笛（李白）
一为迁客去长沙，西望长安不见家。
黄鹤楼中吹玉笛，江城五月落梅花。`,
        pinyin: `huáng hè lóu cuī hào xī rén yǐ chéng huáng hè qù cǐ dì kōng yú huáng hè lóu huáng hè yī qù bù fù fǎn bái yún qiān zǎi kōng yōu yōu qíng chuān lì lì hàn yáng shù fāng cǎo qī qī yīng wǔ zhōu rì mù xiāng guān hé chù shì yān bō jiāng shàng shǐ rén chóu huáng hè lóu sòng mèng hào rán zhī guǎng líng lǐ bái gù rén xī cí huáng hè lóu yān huā sān yuè xià yáng zhōu gū fān yuǎn yǐng bì kōng jìn wéi jiàn cháng jiāng tiān jì liú yǔ shǐ láng zhōng qīn tīng huáng hè lóu shàng chuī yù dí lǐ bái yī wéi qiān kè qù cháng shā xī wàng cháng ān bù jiàn jiā huáng hè lóu zhōng chuī yù dí jiāng chéng wǔ yuè luò méi huā`
    },
    4: {
        title: "出师表",
        author: "三国 · 诸葛亮",
        location: "河南南阳卧龙岗",
        content: `先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。
宫中府中，俱为一体；陟罚臧否，不宜异同。若有作奸犯科及为忠善者，宜付有司论其刑赏，以昭陛下平明之理，不宜偏私，使内外异法也。
侍中、侍郎郭攸之、费祎、董允等，此皆良实，志虑忠纯，是以先帝简拔以遗陛下。愚以为宫中之事，事无大小，悉以咨之，然后施行，必能裨补阙漏，有所广益。
将军向宠，性行淑均，晓畅军事，试用于昔日，先帝称之曰能，是以众议举宠为督。愚以为营中之事，悉以咨之，必能使行阵和睦，优劣得所。
亲贤臣，远小人，此先汉所以兴隆也；亲小人，远贤臣，此后汉所以倾颓也。先帝在时，每与臣论此事，未尝不叹息痛恨于桓、灵也。侍中、尚书、长史、参军，此悉贞良死节之臣，愿陛下亲之信之，则汉室之隆，可计日而待也。
臣本布衣，躬耕于南阳，苟全性命于乱世，不求闻达于诸侯。先帝不以臣卑鄙，猥自枉屈，三顾臣于草庐之中，咨臣以当世之事，由是感激，遂许先帝以驱驰。后值倾覆，受任于败军之际，奉命于危难之间，尔来二十有一年矣。
先帝知臣谨慎，故临崩寄臣以大事也。受命以来，夙夜忧叹，恐托付不效，以伤先帝之明；故五月渡泸，深入不毛。今南方已定，兵甲已足，当奖率三军，北定中原，庶竭驽钝，攘除奸凶，兴复汉室，还于旧都。此臣所以报先帝而忠陛下之职分也。至于斟酌损益，进尽忠言，则攸之、祎、允之任也。
愿陛下托臣以讨贼兴复之效，不效，则治臣之罪，以告先帝之灵。若无兴德之言，则责攸之、祎、允等之慢，以彰其咎；陛下亦宜自谋，以咨诹善道，察纳雅言，深追先帝遗诏。臣不胜受恩感激。
今当远离，临表涕零，不知所言。`,
        pinyin: `xiān dì chuàng yè wèi bàn ér zhōng dào bēng cú jīn tiān xià sān fēn yì zhōu pí bì cǐ chéng wēi jí cún wáng zhī qiū yě rán shì wèi zhī chén bù xiè yú nèi zhōng zhì zhī shì wàng shēn yú wài zhě gài zhuī xiān dì zhī shū yù yù bào zhī yú bì xià yě chéng yí kāi zhāng shèng tīng yǐ guāng xiān dì yí dé huī hóng zhì shì zhī qì bù yí wàng zì fěi bó yǐn yù shī yì yǐ sè zhōng jiàn zhī lù yě gōng zhōng fǔ zhōng jù wéi yī tǐ zhì fá zāng pǐ bù yí yì tóng ruò yǒu zuò jiān fàn kē jí wéi zhōng shàn zhě yí fù yǒu sī lùn qí xíng shǎng yǐ zhāo bì xià píng míng zhī lǐ bù yí piān sī shǐ nèi wài yì fǎ yě shì zhōng shì láng guō yōu zhī fèi yī dǒng yǔn děng cǐ jiē liáng shí zhì lǜ zhōng chún shì yǐ xiān dì jiǎn bá yǐ yí bì xià yú yǐ wéi gōng zhōng zhī shì shì wú dà xiǎo xī yǐ zī zhī rán hòu shī xíng bì néng bì bǔ quē lòu yǒu suǒ guǎng yì jiāng jūn xiàng chǒng xìng xíng shū jūn xiǎo chàng jūn shì shì yòng yú xī rì xiān dì chēng zhī yuē néng shì yǐ zhòng yì jǔ chǒng wéi dū yú yǐ wéi yíng zhōng zhī shì xī yǐ zī zhī bì néng shǐ háng zhèn hé mù yōu liè dé suǒ qīn xián chén yuǎn xiǎo rén cǐ xiān hàn suǒ yǐ xīng lóng yě qīn xiǎo rén yuǎn xián chén cǐ hòu hàn suǒ yǐ qīng tuí yě xiān dì zài shí měi yǔ chén lùn cǐ shì wèi cháng bù tàn xī tòng hèn yú huán líng yě shì zhōng shàng shū zhǎng shǐ cān jūn cǐ xī zhēn liáng sǐ jié zhī chén yuàn bì xià qīn zhī xìn zhī zé hàn shì zhī lóng kě jì rì ér dài yě chén běn bù yī gōng gēng yú nán yáng gǒu quán xìng mìng yú luàn shì bù qiú wén dá yú zhū hóu xiān dì bù yǐ chén bēi bǐ wěi zì wǎng qū sān gù chén yú cǎo lú zhī zhōng zī chén yǐ dāng shì zhī shì yóu shì gǎn jī suì xǔ xiān dì yǐ qū chí hòu zhí qīng fù shòu rèn yú bài jūn zhī jì fèng mìng yú wēi nàn zhī jiān ěr lái èr shí yǒu yī nián yǐ xiān dì zhī chén jǐn shèn gù lín bēng jì chén yǐ dà shì yě shòu mìng yǐ lái sù yè yōu tàn kǒng tuō fù bù xiào yǐ shāng xiān dì zhī míng gù wǔ yuè dù lú shēn rù bù máo jīn nán fāng yǐ dìng bīng jiǎ yǐ zú dāng jiǎng shuài sān jūn běi dìng zhōng yuán shù jié nú dùn rǎng chú jiān xiōng xīng fù hàn shì huán yú jiù dū cǐ chén suǒ yǐ bào xiān dì ér zhōng bì xià zhī zhí fèn yě zhì yú zhēn zhuó sǔn yì jìn jìn zhōng yán zé yōu zhī yī yǔn zhī rèn yě yuàn bì xià tuō chén yǐ tǎo zéi xīng fù zhī xiào bù xiào zé zhì chén zhī zuì yǐ gào xiān dì zhī líng ruò wú xīng dé zhī yán zé zé yōu zhī yī yǔn děng zhī màn yǐ zhāng qí jiù bì xià yì yí zì móu yǐ zī zōu shàn dào chá nà yǎ yán shēn zhuī xiān dì yí zhào chén bù shèng shòu ēn gǎn jī jīn dāng yuǎn lí lín biǎo tì líng bù zhī suǒ yán`
    },
    5: {
        title: "醉翁亭记",
        author: "宋 · 欧阳修",
        location: "安徽滁州琅琊山",
        content: `环滁皆山也。其西南诸峰，林壑尤美，望之蔚然而深秀者，琅琊也。山行六七里，渐闻水声潺潺而泻出于两峰之间者，酿泉也。峰回路转，有亭翼然临于泉上者，醉翁亭也。作亭者谁？山之僧智仙也。名之者谁？太守自谓也。太守与客来饮于此，饮少辄醉，而年又最高，故自号曰醉翁也。醉翁之意不在酒，在乎山水之间也。山水之乐，得之心而寓之酒也。
若夫日出而林霏开，云归而岩穴暝，晦明变化者，山间之朝暮也。野芳发而幽香，佳木秀而繁阴，风霜高洁，水落而石出者，山间之四时也。朝而往，暮而归，四时之景不同，而乐亦无穷也。
至于负者歌于途，行者休于树，前者呼，后者应，伛偻提携，往来而不绝者，滁人游也。临溪而渔，溪深而鱼肥。酿泉为酒，泉香而酒洌；山肴野蔌，杂然而前陈者，太守宴也。宴酣之乐，非丝非竹，射者中，弈者胜，觥筹交错，起坐而喧哗者，众宾欢也。苍颜白发，颓然乎其间者，太守醉也。
已而夕阳在山，人影散乱，太守归而宾客从也。树林阴翳，鸣声上下，游人去而禽鸟乐也。然而禽鸟知山林之乐，而不知人之乐；人知从太守游而乐，而不知太守之乐其乐也。醉能同其乐，醒能述以文者，太守也。太守谓谁？庐陵欧阳修也。`,
        pinyin: `huán chú jiē shān yě qí xī nán zhū fēng lín hè yóu měi wàng zhī wèi rán ér shēn xiù zhě láng yá yě shān xíng liù qī lǐ jiàn wén shuǐ shēng chán chán ér xiè chū yú liǎng fēng zhī jiān zhě niàng quán yě fēng huí lù zhuǎn yǒu tíng yì rán lín yú quán shàng zhě zuì wēng tíng yě zuò tíng zhě shuí shān zhī sēng zhì xiān yě míng zhī zhě shuí tài shǒu zì wèi yě tài shǒu yǔ kè lái yǐn yú cǐ yǐn shǎo zhé zuì ér nián yòu zuì gāo gù zì hào yuē zuì wēng yě zuì wēng zhī yì bù zài jiǔ zài hū shān shuǐ zhī jiān yě shān shuǐ zhī lè dé zhī xīn ér yù zhī jiǔ yě ruò fū rì chū ér lín fēi kāi yún guī ér yán xué míng huì míng biàn huà zhě shān jiān zhī zhāo mù yě yě fāng fā ér yōu xiāng jiā mù xiù ér fán yīn fēng shuāng gāo jié shuǐ luò ér shí chū zhě shān jiān zhī sì shí yě zhāo ér wǎng mù ér guī sì shí zhī jǐng bù tóng ér lè yì wú qióng yě zhì yú fù zhě gē yú tú xíng zhě xiū yú shù qián zhě hū hòu zhě yìng yǔ lǚ tí xié wǎng lái ér bù jué zhě chú rén yóu yě lín xī ér yú xī shēn ér yú féi niàng quán wéi jiǔ quán xiāng ér jiǔ liè shān yáo yě sù zá rán ér qián chén zhě tài shǒu yàn yě yàn hān zhī lè fēi sī fēi zhú shè zhě zhōng yì zhě shèng gōng chóu jiāo cuò qǐ zuò ér xuān huá zhě zhòng bīn huān yě cāng yán bái fà tuí rán hū qí jiān zhě tài shǒu zuì yě yǐ ér xī yáng zài shān rén yǐng sǎn luàn tài shǒu guī ér bīn kè cóng yě shù lín yīn yì míng shēng shàng xià yóu rén qù ér qín niǎo lè yě rán ér qín niǎo zhī shān lín zhī lè ér bù zhī rén zhī lè rén zhī cóng tài shǒu yóu ér lè ér bù zhī tài shǒu zhī lè qí lè yě zuì néng tóng qí lè xǐng néng shù yǐ wén zhě tài shǒu yě tài shǒu wèi shuí lú líng ōu yáng xiū yě`
    },
    6: {
        title: "春江花月夜",
        author: "唐 · 张若虚",
        location: "江苏扬州瘦西湖",
        content: `春江潮水连海平，海上明月共潮生。
滟滟随波千万里，何处春江无月明！
江流宛转绕芳甸，月照花林皆似霰。
空里流霜不觉飞，汀上白沙看不见。
江天一色无纤尘，皎皎空中孤月轮。
江畔何人初见月？江月何年初照人？
人生代代无穷已，江月年年望相似。
不知江月待何人，但见长江送流水。
白云一片去悠悠，青枫浦上不胜愁。
谁家今夜扁舟子？何处相思明月楼？
可怜楼上月徘徊，应照离人妆镜台。
玉户帘中卷不去，捣衣砧上拂还来。
此时相望不相闻，愿逐月华流照君。
鸿雁长飞光不度，鱼龙潜跃水成文。
昨夜闲潭梦落花，可怜春半不还家。
江水流春去欲尽，江潭落月复西斜。
斜月沉沉藏海雾，碣石潇湘无限路。
不知乘月几人归，落月摇情满江树。`,
        pinyin: `chūn jiāng cháo shuǐ lián hǎi píng hǎi shàng míng yuè gòng cháo shēng yàn yàn suí bō qiān wàn lǐ hé chù chūn jiāng wú yuè míng jiāng liú wǎn zhuǎn rào fāng diàn yuè zhào huā lín jiē sì xiàn kōng lǐ liú shuāng bù jué fēi tīng shàng bái shā kàn bù jiàn jiāng tiān yī sè wú xiān chén jiǎo jiǎo kōng zhōng gū yuè lún jiāng pàn hé rén chū jiàn yuè jiāng yuè hé nián chū zhào rén rén shēng dài dài wú qióng yǐ jiāng yuè nián nián wàng xiāng sì bù zhī jiāng yuè dài hé rén dàn jiàn cháng jiāng sòng liú shuǐ bái yún yī piàn qù yōu yōu qīng fēng pǔ shàng bù shèng chóu shuí jiā jīn yè piān zhōu zǐ hé chù xiāng sī míng yuè lóu kě lián lóu shàng yuè pái huái yīng zhào lí rén zhuāng jìng tái yù hù lián zhōng juǎn bù qù dǎo yī zhēn shàng fú hái lái cǐ shí xiāng wàng bù xiāng wén yuàn zhú yuè huá liú zhào jūn hóng yàn cháng fēi guāng bù dù yú lóng qián yuè shuǐ chéng wén zuó yè xián tán mèng luò huā kě lián chūn bàn bù huán jiā jiāng shuǐ liú chūn qù yù jìn jiāng tán luò yuè fù xī xié xié yuè chén chén cáng hǎi wù jié shí xiāo xiāng wú xiàn lù bù zhī chéng yuè jǐ rén guī luò yuè yáo qíng mǎn jiāng shù`
    },
    7: {
        title: "赤壁赋",
        author: "宋 · 苏轼",
        location: "湖北黄冈东坡赤壁",
        content: `壬戌之秋，七月既望，苏子与客泛舟游于赤壁之下。清风徐来，水波不兴。举酒属客，诵明月之诗，歌窈窕之章。少焉，月出于东山之上，徘徊于斗牛之间。白露横江，水光接天。纵一苇之所如，凌万顷之茫然。浩浩乎如冯虚御风，而不知其所止；飘飘乎如遗世独立，羽化而登仙。
于是饮酒乐甚，扣舷而歌之。歌曰："桂棹兮兰桨，击空明兮溯流光。渺渺兮予怀，望美人兮天一方。"客有吹洞箫者，倚歌而和之。其声呜呜然，如怨如慕，如泣如诉，余音袅袅，不绝如缕。舞幽壑之潜蛟，泣孤舟之嫠妇。
苏子愀然，正襟危坐而问客曰："何为其然也？"客曰："月明星稀，乌鹊南飞，此非曹孟德之诗乎？西望夏口，东望武昌，山川相缪，郁乎苍苍，此非孟德之困于周郎者乎？方其破荆州，下江陵，顺流而东也，舳舻千里，旌旗蔽空，酾酒临江，横槊赋诗，固一世之雄也，而今安在哉？况吾与子渔樵于江渚之上，侣鱼虾而友麋鹿，驾一叶之扁舟，举匏樽以相属。寄蜉蝣于天地，渺沧海之一粟。哀吾生之须臾，羡长江之无穷。挟飞仙以遨游，抱明月而长终。知不可乎骤得，托遗响于悲风。"
苏子曰："客亦知夫水与月乎？逝者如斯，而未尝往也；盈虚者如彼，而卒莫消长也。盖将自其变者而观之，则天地曾不能以一瞬；自其不变者而观之，则物与我皆无尽也，而又何羡乎！且夫天地之间，物各有主，苟非吾之所有，虽一毫而莫取。惟江上之清风，与山间之明月，耳得之而为声，目遇之而成色，取之无禁，用之不竭。是造物者之无尽藏也，而吾与子之所共适。"
客喜而笑，洗盏更酌。肴核既尽，杯盘狼籍。相与枕藉乎舟中，不知东方之既白。`,
        pinyin: `rén xū zhī qiū qī yuè jì wàng sū zǐ yǔ kè fàn zhōu yóu yú chì bì zhī xià qīng fēng xú lái shuǐ bō bù xīng jǔ jiǔ zhǔ kè sòng míng yuè zhī shī gē yǎo tiǎo zhī zhāng shǎo yān yuè chū yú dōng shān zhī shàng pái huái yú dǒu niú zhī jiān bái lù héng jiāng shuǐ guāng jiē tiān zòng yī wěi zhī suǒ rú líng wàn qǐng zhī máng rán hào hào hū rú píng xū yù fēng ér bù zhī qí suǒ zhǐ piāo piāo hū rú yí shì dú lì yǔ huà ér dēng xiān yú shì yǐn jiǔ lè shèn kòu xián ér gē zhī gē yuē guì zhào xī lán jiǎng jī kōng míng xī sù liú guāng miǎo miǎo xī yǔ huái wàng měi rén xī tiān yī fāng kè yǒu chuī dòng xiāo zhě yǐ gē ér hè zhī qí shēng wū wū rán rú yuàn rú mù rú qì rú sù yú yīn niǎo niǎo bù jué rú lǚ wǔ yōu hè zhī qián jiāo qì gū zhōu zhī lí fù sū zǐ qiǎo rán zhèng jīn wēi zuò ér wèn kè yuē hé wéi qí rán yě kè yuē yuè míng xīng xī wū què nán fēi cǐ fēi cáo mèng dé zhī shī hū xī wàng xià kǒu dōng wàng wǔ chāng shān chuān xiāng liáo yù hū cāng cāng cǐ fēi mèng dé zhī kùn yú zhōu láng zhě hū fāng qí pò jīng zhōu xià jiāng líng shùn liú ér dōng yě zhú lú qiān lǐ jīng qí bì kōng shāi jiǔ lín jiāng héng shuò fù shī gù yī shì zhī xióng yě ér jīn ān zài zāi kuàng wú yǔ zǐ yú qiáo yú jiāng zhǔ zhī shàng lǚ yú xiā ér yǒu mí lù jià yī yè zhī piān zhōu jǔ páo zūn yǐ xiāng zhǔ jì fú yóu yú tiān dì miǎo cāng hǎi zhī yī sù āi wú shēng zhī xū yú xiàn cháng jiāng zhī wú qióng xié fēi xiān yǐ áo yóu bào míng yuè ér cháng zhōng zhī bù kě hū zhòu dé tuō yí xiǎng yú bēi fēng sū zǐ yuē kè yì zhī fū shuǐ yǔ yuè hū shì zhě rú sī ér wèi cháng wǎng yě yíng xū zhě rú bǐ ér zú mò xiāo zhǎng yě gài jiāng zì qí biàn zhě ér guān zhī zé tiān dì céng bù néng yǐ yī shùn zì qí bù biàn zhě ér guān zhī zé wù yǔ wǒ jiē wú jìn yě ér yòu hé xiàn hū qiě fū tiān dì zhī jiān wù gè yǒu zhǔ gǒu fēi wú zhī suǒ yǒu suī yī háo ér mò qǔ wéi jiāng shàng zhī qīng fēng yǔ shān jiān zhī míng yuè ěr dé zhī ér wéi shēng mù yù zhī ér chéng sè qǔ zhī wú jìn yòng zhī bù jié shì zào wù zhě zhī wú jìn cáng yě ér wú yǔ zǐ zhī suǒ gòng shì kè xǐ ér xiào xǐ zhǎn gèng zhuó yáo hé jì jìn bēi pán láng jí xiāng yǔ zhěn jiè hū zhōu zhōng bù zhī dōng fāng zhī jì bái`
    },
    8: {
        title: "桃花源记",
        author: "晋 · 陶渊明",
        location: "湖南常德桃花源景区",
        content: `晋太元中，武陵人捕鱼为业。缘溪行，忘路之远近。忽逢桃花林，夹岸数百步，中无杂树，芳草鲜美，落英缤纷。渔人甚异之，复前行，欲穷其林。
林尽水源，便得一山，山有小口，仿佛若有光。便舍船，从口入。初极狭，才通人。复行数十步，豁然开朗。土地平旷，屋舍俨然，有良田美池桑竹之属。阡陌交通，鸡犬相闻。其中往来种作，男女衣着，悉如外人。黄发垂髫，并怡然自乐。
见渔人，乃大惊，问所从来。具答之。便要还家，设酒杀鸡作食。村中闻有此人，咸来问讯。自云先世避秦时乱，率妻子邑人来此绝境，不复出焉，遂与外人间隔。问今是何世，乃不知有汉，无论魏晋。此人一一为具言所闻，皆叹惋。余人各复延至其家，皆出酒食。停数日，辞去。此中人语云："不足为外人道也。"
既出，得其船，便扶向路，处处志之。及郡下，诣太守，说如此。太守即遣人随其往，寻向所志，遂迷，不复得路。
南阳刘子骥，高尚士也，闻之，欣然规往。未果，寻病终。后遂无问津者。`,
        pinyin: `jìn tài yuán zhōng wǔ líng rén bǔ yú wéi yè yuán xī xíng wàng lù zhī yuǎn jìn hū féng táo huā lín jiā àn shù bǎi bù zhōng wú zá shù fāng cǎo xiān měi luò yīng bīn fēn yú rén shèn yì zhī fù qián xíng yù qióng qí lín lín jìn shuǐ yuán biàn dé yī shān shān yǒu xiǎo kǒu fǎng fú ruò yǒu guāng biàn shě chuán cóng kǒu rù chū jí xiá cái tōng rén fù xíng shù shí bù huò rán kāi lǎng tǔ dì píng kuàng wū shè yǎn rán yǒu liáng tián měi chí sāng zhú zhī shǔ qiān mò jiāo tōng jī quǎn xiāng wén qí zhōng wǎng lái zhòng zuò nán nǚ yī zhuó xī rú wài rén huáng fà chuí tiáo bìng yí rán zì lè jiàn yú rén nǎi dà jīng wèn suǒ cóng lái jù dá zhī biàn yāo huán jiā shè jiǔ shā jī zuò shí cūn zhōng wén yǒu cǐ rén xián lái wèn xùn zì yún xiān shì bì qín shí luàn shuài qī zǐ yì rén lái cǐ jué jìng bù fù chū yān suì yǔ wài rén jiàn gé wèn jīn shì hé shì nǎi bù zhī yǒu hàn wú lùn wèi jìn cǐ rén yī yī wéi jù yán suǒ wén jiē tàn wǎn yú rén gè fù yán zhì qí jiā jiē chū jiǔ shí tíng shù rì cí qù cǐ zhōng rén yǔ yún bù zú wéi wài rén dào yě jì chū dé qí chuán biàn fú xiàng lù chù chù zhì zhī jí jùn xià yì tài shǒu shuō rú cǐ tài shǒu jí qiǎn rén suí qí wǎng xún xiàng suǒ zhì suì mí bù fù dé lù nán yáng liú zǐ jì gāo shàng shì yě wén zhī xīn rán guī wǎng wèi guǒ xún bìng zhōng hòu suì wú wèn jīn zhě`
    },
    9: {
        title: "满江红",
        author: "宋 · 岳飞",
        location: "河南安阳岳飞庙",
        content: `怒发冲冠，凭栏处、潇潇雨歇。抬望眼，仰天长啸，壮怀激烈。三十功名尘与土，八千里路云和月。莫等闲、白了少年头，空悲切！
靖康耻，犹未雪。臣子恨，何时灭！驾长车，踏破贺兰山缺。壮志饥餐胡虏肉，笑谈渴饮匈奴血。待从头、收拾旧山河，朝天阙。`,
        pinyin: `nù fà chōng guān píng lán chù xiāo xiāo yǔ xiē tái wàng yǎn yǎng tiān cháng xiào zhuàng huái jī liè sān shí gōng míng chén yǔ tǔ bā qiān lǐ lù yún hé yuè mò děng xián bái le shào nián tóu kōng bēi qiè jìng kāng chǐ yóu wèi xuě chén zǐ hèn hé shí miè jià cháng chē tà pò hè lán shān quē zhuàng zhì jī cān hú lǔ ròu xiào tán kě yǐn xiōng nú xuè dài cóng tóu shōu shí jiù shān hé cháo tiān què`
    },
    10: {
        title: "梦游天姥吟留别",
        author: "唐 · 李白",
        location: "浙江台州神仙居",
        content: `海客谈瀛洲，烟涛微茫信难求；
越人语天姥，云霞明灭或可睹。
天姥连天向天横，势拔五岳掩赤城。
天台四万八千丈，对此欲倒东南倾。
我欲因之梦吴越，一夜飞度镜湖月。
湖月照我影，送我至剡溪。
谢公宿处今尚在，渌水荡漾清猿啼。
脚著谢公屐，身登青云梯。
半壁见海日，空中闻天鸡。
千岩万转路不定，迷花倚石忽已暝。
熊咆龙吟殷岩泉，栗深林兮惊层巅。
云青青兮欲雨，水澹澹兮生烟。
列缺霹雳，丘峦崩摧。
洞天石扉，訇然中开。
青冥浩荡不见底，日月照耀金银台。
霓为衣兮风为马，云之君兮纷纷而来下。
虎鼓瑟兮鸾回车，仙之人兮列如麻。
忽魂悸以魄动，恍惊起而长嗟。
惟觉时之枕席，失向来之烟霞。
世间行乐亦如此，古来万事东流水。
别君去兮何时还？且放白鹿青崖间，须行即骑访名山。
安能摧眉折腰事权贵，使我不得开心颜！`,
        pinyin: `hǎi kè tán yíng zhōu yān tāo wēi máng xìn nán qiú yuè rén yǔ tiān mǔ yún xiá míng miè huò kě dǔ tiān mǔ lián tiān xiàng tiān héng shì bá wǔ yuè yǎn chì chéng tiān tāi sì wàn bā qiān zhàng duì cǐ yù dǎo dōng nán qīng wǒ yù yīn zhī mèng wú yuè yī yè fēi dù jìng hú yuè hú yuè zhào wǒ yǐng sòng wǒ zhì shàn xī xiè gōng sù chù jīn shàng zài lù shuǐ dàng yàng qīng yuán tí jiǎo zhuó xiè gōng jī shēn dēng qīng yún tī bàn bì jiàn hǎi rì kōng zhōng wén tiān jī qiān yán wàn zhuǎn lù bù dìng mí huā yǐ shí hū yǐ míng xióng páo lóng yín yīn yán quán lì shēn lín xī jīng céng diān yún qīng qīng xī yù yǔ shuǐ dàn dàn xī shēng yān liè quē pī lì qiū luán bēng cuī dòng tiān shí fēi hōng rán zhōng kāi qīng míng hào dàng bù jiàn dǐ rì yuè zhào yào jīn yín tái ní wéi yī xī fēng wéi mǎ yún zhī jūn xī fēn fēn ér lái xià hǔ gǔ sè xī luán huí chē xiān zhī rén xī liè rú má hū hún jì yǐ pò dòng huǎng jīng qǐ ér cháng jiē wéi jué shí zhī zhěn xí shī xiàng lái zhī yān xiá shì jiān xíng lè yì rú cǐ gǔ lái wàn shì dōng liú shuǐ bié jūn qù xī hé shí huán qiě fàng bái lù qīng yá jiān xū xíng jí qí fǎng míng shān ān néng cuī méi zhé yāo shì quán guì shǐ wǒ bù dé kāi xīn yán`
    },
    11: {
        title: "蜀道难",
        author: "唐 · 李白",
        location: "四川广元剑门关",
        content: `噫吁嚱，危乎高哉！
蜀道之难，难于上青天！
蚕丛及鱼凫，开国何茫然！
尔来四万八千岁，不与秦塞通人烟。
西当太白有鸟道，可以横绝峨眉巅。
地崩山摧壮士死，然后天梯石栈相钩连。
上有六龙回日之高标，下有冲波逆折之回川。
黄鹤之飞尚不得过，猿猱欲度愁攀援。
青泥何盘盘，百步九折萦岩峦。
扪参历井仰胁息，以手抚膺坐长叹。
问君西游何时还？畏途巉岩不可攀。
但见悲鸟号古木，雄飞雌从绕林间。
又闻子规啼夜月，愁空山。
蜀道之难，难于上青天，使人听此凋朱颜！
连峰去天不盈尺，枯松倒挂倚绝壁。
飞湍瀑流争喧豗，砯崖转石万壑雷。
其险也如此，嗟尔远道之人胡为乎来哉！
剑阁峥嵘而崔嵬，一夫当关，万夫莫开。
所守或匪亲，化为狼与豺。
朝避猛虎，夕避长蛇；磨牙吮血，杀人如麻。
锦城虽云乐，不如早还家。
蜀道之难，难于上青天，侧身西望长咨嗟！`,
        pinyin: `yī xū xī wēi hū gāo zāi shǔ dào zhī nán nán yú shàng qīng tiān cán cóng jí yú fú kāi guó hé máng rán ěr lái sì wàn bā qiān suì bù yǔ qín sài tōng rén yān xī dāng tài bái yǒu niǎo dào kě yǐ héng jué é méi diān dì bēng shān cuī zhuàng shì sǐ rán hòu tiān tī shí zhàn xiāng gōu lián shàng yǒu liù lóng huí rì zhī gāo biāo xià yǒu chōng bō nì zhé zhī huí chuān huáng hè zhī fēi shàng bù dé guò yuán náo yù dù chóu pān yuán qīng ní hé pán pán bǎi bù jiǔ zhé yíng yán luán mén shēn lì jǐng yǎng xié xī yǐ shǒu fǔ yīng zuò cháng tàn wèn jūn xī yóu hé shí huán wèi tú chán yán bù kě pān dàn jiàn bēi niǎo háo gǔ mù xióng fēi cí cóng rào lín jiān yòu wén zǐ guī tí yè yuè chóu kōng shān shǔ dào zhī nán nán yú shàng qīng tiān shǐ rén tīng cǐ diāo zhū yán lián fēng qù tiān bù yíng chǐ kū sōng dào guà yǐ jué bì fēi tuān pù liú zhēng xuān huī pīng yá zhuǎn shí wàn hè léi qí xiǎn yě rú cǐ jiē ěr yuǎn dào zhī rén hú wéi hū lái zāi jiàn gé zhēng róng ér cuī wéi yī fū dāng guān wàn fū mò kāi suǒ shǒu huò fěi qīn huà wéi láng yǔ chái zhāo bì měng hǔ xī bì cháng shé mó yá shǔn xuè shā rén rú má jǐn chéng suī yún lè bù rú zǎo huán jiā shǔ dào zhī nán nán yú shàng qīng tiān cè shēn xī wàng cháng zī jiē`
    },
    12: {
        title: "兰亭集序",
        author: "晋 · 王羲之",
        location: "浙江绍兴兰亭",
        content: `永和九年，岁在癸丑，暮春之初，会于会稽山阴之兰亭，修禊事也。群贤毕至，少长咸集。此地有崇山峻岭，茂林修竹；又有清流激湍，映带左右，引以为流觞曲水，列坐其次。虽无丝竹管弦之盛，一觞一咏，亦足以畅叙幽情。
是日也，天朗气清，惠风和畅。仰观宇宙之大，俯察品类之盛，所以游目骋怀，足以极视听之娱，信可乐也。
夫人之相与，俯仰一世。或取诸怀抱，悟言一室之内；或因寄所托，放浪形骸之外。虽趣舍万殊，静躁不同，当其欣于所遇，暂得于己，快然自足，不知老之将至。及其所之既倦，情随事迁，感慨系之矣。向之所欣，俯仰之间，已为陈迹，犹不能不以之兴怀。况修短随化，终期于尽。古人云："死生亦大矣。"岂不痛哉！
每览昔人兴感之由，若合一契，未尝不临文嗟悼，不能喻之于怀。固知一死生为虚诞，齐彭殇为妄作。后之视今，亦犹今之视昔。悲夫！故列叙时人，录其所述。虽世殊事异，所以兴怀，其致一也。后之览者，亦将有感于斯文。`,
        pinyin: `yǒng hé jiǔ nián suì zài guǐ chǒu mù chūn zhī chū huì yú kuài jī shān yīn zhī lán tíng xiū xì shì yě qún xián bì zhì shào zhǎng xián jí cǐ dì yǒu chóng shān jùn lǐng mào lín xiū zhú yòu yǒu qīng liú jī tuān yìng dài zuǒ yòu yǐn yǐ wéi liú shāng qǔ shuǐ liè zuò qí cì suī wú sī zhú guǎn xián zhī shèng yī shāng yī yǒng yì zú yǐ chàng xù yōu qíng shì rì yě tiān lǎng qì qīng huì fēng hé chàng yǎng guān yǔ zhòu zhī dà fǔ chá pǐn lèi zhī shèng suǒ yǐ yóu mù chěng huái zú yǐ jí shì tīng zhī yú xìn kě lè yě fū rén zhī xiāng yǔ fǔ yǎng yī shì huò qǔ zhū huái bào wù yán yī shì zhī nèi huò yīn jì suǒ tuō fàng làng xíng hái zhī wài suī qù shě wàn shū jìng zào bù tóng dāng qí xīn yú suǒ yù zàn dé yú jǐ kuài rán zì zú bù zhī lǎo zhī jiāng zhì jí qí suǒ zhī jì juàn qíng suí shì qiān gǎn kǎi xì zhī yǐ xiàng zhī suǒ xīn fǔ yǎng zhī jiān yǐ wéi chén jī yóu bù néng bù yǐ zhī xìng huái kuàng xiū duǎn suí huà zhōng qī yú jìn gǔ rén yún sǐ shēng yì dà yǐ qǐ bù tòng zāi měi lǎn xī rén xìng gǎn zhī yóu ruò hé yī qì wèi cháng bù lín wén jiē dào bù néng yù zhī yú huái gù zhī yī sǐ shēng wéi xū dàn qí péng shāng wéi wàng zuò hòu zhī shì jīn yì yóu jīn zhī shì xī bēi fū gù liè xù shí rén lù qí suǒ shù suī shì shū shì yì suǒ yǐ xìng huái qí zhì yī yě hòu zhī lǎn zhě yì jiāng yǒu gǎn yú sī wén`
    },
    13: {
        title: "道德经1-9章",
        author: "春秋 · 老子",
        location: "江西鹰潭龙虎山",
        content: `第一章
道可道，非常道；名可名，非常名。
无名天地之始，有名万物之母。
故常无欲，以观其妙；常有欲，以观其徼。
此两者同出而异名，同谓之玄，玄之又玄，众妙之门。

第二章
天下皆知美之为美，斯恶已；皆知善之为善，斯不善已。
故有无相生，难易相成，长短相形，高下相倾，音声相和，前后相随。
是以圣人处无为之事，行不言之教，万物作焉而不辞，生而不有，为而不恃，功成而弗居。
夫唯弗居，是以不去。

第三章
不尚贤，使民不争；不贵难得之货，使民不为盗；不见可欲，使民心不乱。
是以圣人之治，虚其心，实其腹，弱其志，强其骨。
常使民无知无欲，使夫智者不敢为也。
为无为，则无不治。

第四章
道冲而用之或不盈，渊兮似万物之宗。
挫其锐，解其纷，和其光，同其尘。
湛兮似或存，吾不知谁之子，象帝之先。

第五章
天地不仁，以万物为刍狗；圣人不仁，以百姓为刍狗。
天地之间，其犹橐龠乎？虚而不屈，动而愈出。
多言数穷，不如守中。

第六章
谷神不死，是谓玄牝。
玄牝之门，是谓天地根。
绵绵若存，用之不勤。

第七章
天长地久。
天地所以能长且久者，以其不自生，故能长生。
是以圣人后其身而身先，外其身而身存。
非以其无私邪？故能成其私。

第八章
上善若水。
水善利万物而不争，处众人之所恶，故几于道。
居善地，心善渊，与善仁，言善信，政善治，事善能，动善时。
夫唯不争，故无尤。

第九章
持而盈之，不如其已；揣而锐之，不可长保。
金玉满堂，莫之能守；富贵而骄，自遗其咎。
功成身退，天之道也。`,
        pinyin: `dì yī zhāng dào kě dào fēi cháng dào míng kě míng fēi cháng míng wú míng tiān dì zhī shǐ yǒu míng wàn wù zhī mǔ gù cháng wú yù yǐ guān qí miào cháng yǒu yù yǐ guān qí jiǎo cǐ liǎng zhě tóng chū ér yì míng tóng wèi zhī xuán xuán zhī yòu xuán zhòng miào zhī mén dì èr zhāng tiān xià jiē zhī měi zhī wéi měi sī è yǐ jiē zhī shàn zhī wéi shàn sī bù shàn yǐ gù yǒu wú xiāng shēng nán yì xiāng chéng cháng duǎn xiāng xíng gāo xià xiāng qīng yīn shēng xiāng hé qián hòu xiāng suí shì yǐ shèng rén chǔ wú wéi zhī shì xíng bù yán zhī jiào wàn wù zuò yān ér bù cí shēng ér bù yǒu wéi ér bù shì gōng chéng ér fú jū fū wéi fú jū shì yǐ bù qù dì sān zhāng bù shàng xián shǐ mín bù zhēng bù guì nán dé zhī huò shǐ mín bù wéi dào bù jiàn kě yù shǐ mín xīn bù luàn shì yǐ shèng rén zhī zhì xū qí xīn shí qí fù ruò qí zhì qiáng qí gǔ cháng shǐ mín wú zhī wú yù shǐ fū zhì zhě bù gǎn wéi yě wèi wú wéi zé wú bù zhì dì sì zhāng dào chōng ér yòng zhī huò bù yíng yuān xī sì wàn wù zhī zōng cuò qí ruì jiě qí fēn hé qí guāng tóng qí chén zhàn xī sì huò cún wú bù zhī shuí zhī zǐ xiàng dì zhī xiān dì wǔ zhāng tiān dì bù rén yǐ wàn wù wéi chú gǒu shèng rén bù rén yǐ bǎi xìng wéi chú gǒu tiān dì zhī jiān qí yóu tuó yuè hū xū ér bù qū dòng ér yù chū duō yán shù qióng bù rú shǒu zhōng dì liù zhāng gǔ shén bù sǐ shì wèi xuán pìn xuán pìn zhī mén shì wèi tiān dì gēn mián mián ruò cún yòng zhī bù qín dì qī zhāng tiān cháng dì jiǔ tiān dì suǒ yǐ néng cháng qiě jiǔ zhě yǐ qí bù zì shēng gù néng cháng shēng shì yǐ shèng rén hòu qí shēn ér shēn xiān wài qí shēn ér shēn cún fēi yǐ qí wú sī xié gù néng chéng qí sī dì bā zhāng shàng shàn ruò shuǐ shuǐ shàn lì wàn wù ér bù zhēng chǔ zhòng rén zhī suǒ è gù jī yú dào jū shàn dì xīn shàn yuān yǔ shàn rén yán shàn xìn zhèng shàn zhì shì shàn néng dòng shàn shí fū wéi bù zhēng gù wú yóu dì jiǔ zhāng chí ér yíng zhī bù rú qí yǐ chuǎi ér ruì zhī bù kě cháng bǎo jīn yù mǎn táng mò zhī néng shǒu fù guì ér jiāo zì yí qí jiù gōng chéng shēn tuì tiān zhī dào yě`
    },
    14: {
        title: "长恨歌",
        author: "唐 · 白居易",
        location: "陕西西安华清宫",
        content: `汉皇重色思倾国，御宇多年求不得。
杨家有女初长成，养在深闺人未识。
天生丽质难自弃，一朝选在君王侧。
回眸一笑百媚生，六宫粉黛无颜色。
春寒赐浴华清池，温泉水滑洗凝脂。
侍儿扶起娇无力，始是新承恩泽时。
云鬓花颜金步摇，芙蓉帐暖度春宵。
春宵苦短日高起，从此君王不早朝。
承欢侍宴无闲暇，春从春游夜专夜。
后宫佳丽三千人，三千宠爱在一身。
金屋妆成娇侍夜，玉楼宴罢醉和春。
姊妹弟兄皆列土，可怜光彩生门户。
遂令天下父母心，不重生男重生女。
骊宫高处入青云，仙乐风飘处处闻。
缓歌慢舞凝丝竹，尽日君王看不足。
渔阳鼙鼓动地来，惊破霓裳羽衣曲。
九重城阙烟尘生，千乘万骑西南行。
翠华摇摇行复止，西出都门百余里。
六军不发无奈何，宛转蛾眉马前死。
花钿委地无人收，翠翘金雀玉搔头。
君王掩面救不得，回看血泪相和流。
黄埃散漫风萧索，云栈萦纡登剑阁。
峨嵋山下少人行，旌旗无光日色薄。
蜀江水碧蜀山青，圣主朝朝暮暮情。
行宫见月伤心色，夜雨闻铃肠断声。
天旋地转回龙驭，到此踌躇不能去。
马嵬坡下泥土中，不见玉颜空死处。
君臣相顾尽沾衣，东望都门信马归。
归来池苑皆依旧，太液芙蓉未央柳。
芙蓉如面柳如眉，对此如何不泪垂。
春风桃李花开日，秋雨梧桐叶落时。
西宫南内多秋草，落叶满阶红不扫。
梨园弟子白发新，椒房阿监青娥老。
夕殿萤飞思悄然，孤灯挑尽未成眠。
迟迟钟鼓初长夜，耿耿星河欲曙天。
鸳鸯瓦冷霜华重，翡翠衾寒谁与共。
悠悠生死别经年，魂魄不曾来入梦。
临邛道士鸿都客，能以精诚致魂魄。
为感君王辗转思，遂教方士殷勤觅。
排空驭气奔如电，升天入地求之遍。
上穷碧落下黄泉，两处茫茫皆不见。
忽闻海上有仙山，山在虚无缥渺间。
楼阁玲珑五云起，其中绰约多仙子。
中有一人字太真，雪肤花貌参差是。
金阙西厢叩玉扃，转教小玉报双成。
闻道汉家天子使，九华帐里梦魂惊。
揽衣推枕起徘徊，珠箔银屏迤逦开。
云鬓半偏新睡觉，花冠不整下堂来。
风吹仙袂飘飘举，犹似霓裳羽衣舞。
玉容寂寞泪阑干，梨花一枝春带雨。
含情凝睇谢君王，一别音容两渺茫。
昭阳殿里恩爱绝，蓬莱宫中日月长。
回头下望人寰处，不见长安见尘雾。
惟将旧物表深情，钿合金钗寄将去。
钗留一股合一扇，钗擘黄金合分钿。
但教心似金钿坚，天上人间会相见。
临别殷勤重寄词，词中有誓两心知。
七月七日长生殿，夜半无人私语时。
在天愿作比翼鸟，在地愿为连理枝。
天长地久有时尽，此恨绵绵无绝期。`,
        pinyin: `hàn huáng zhòng sè sī qīng guó yù yǔ duō nián qiú bù dé yáng jiā yǒu nǚ chū zhǎng chéng yǎng zài shēn guī rén wèi shí tiān shēng lì zhì nán zì qì yī zhāo xuǎn zài jūn wáng cè huí móu yī xiào bǎi mèi shēng liù gōng fěn dài wú yán sè chūn hán cì yù huá qīng chí wēn quán shuǐ huá xǐ níng zhī shì ér fú qǐ jiāo wú lì shǐ shì xīn chéng ēn zé shí yún bìn huā yán jīn bù yáo fú róng zhàng nuǎn dù chūn xiāo chūn xiāo kǔ duǎn rì gāo qǐ cóng cǐ jūn wáng bù zǎo cháo chéng huān shì yàn wú xián xiá chūn cóng chūn yóu yè zhuān yè hòu gōng jiā lì sān qiān rén sān qiān chǒng ài zài yī shēn jīn wū zhuāng chéng jiāo shì yè yù lóu yàn bà zuì hé chūn zǐ mèi dì xiōng jiē liè tǔ kě lián guāng cǎi shēng mén hù suì lìng tiān xià fù mǔ xīn bù chóng shēng nán chóng shēng nǚ lí gōng gāo chù rù qīng yún xiān yuè fēng piāo chù chù wén huǎn gē màn wǔ níng sī zhú jìn rì jūn wáng kàn bù zú yú yáng pí gǔ dòng dì lái jīng pò ní cháng yǔ yī qǔ jiǔ chóng chéng què yān chén shēng qiān shèng wàn qí xī nán xíng cuì huá yáo yáo xíng fù zhǐ xī chū dū mén bǎi yú lǐ liù jūn bù fā wú nài hé wǎn zhuǎn é méi mǎ qián sǐ huā diàn wěi dì wú rén shōu cuì qiào jīn què yù sāo tóu jūn wáng yǎn miàn jiù bù dé huí kàn xuè lèi xiāng hé liú huáng āi sǎn màn fēng xiāo suǒ yún zhàn yíng yū dēng jiàn gé é méi shān xià shǎo rén xíng jīng qí wú guāng rì sè bó shǔ jiāng shuǐ bì shǔ shān qīng shèng zhǔ zhāo zhāo mù mù qíng xíng gōng jiàn yuè shāng xīn sè yè yǔ wén líng cháng duàn shēng tiān xuán dì zhuǎn huí lóng yù dào cǐ chóu chú bù néng qù mǎ wéi pō xià ní tǔ zhōng bù jiàn yù yán kōng sǐ chù jūn chén xiāng gù jìn zhān yī dōng wàng dū mén xìn mǎ guī guī lái chí yuàn jiē yī jiù tài yè fú róng wèi yāng liǔ fú róng rú miàn liǔ rú méi duì cǐ rú hé bù lèi chuí chūn fēng táo lǐ huā kāi rì qiū yǔ wú tóng yè luò shí xī gōng nán nèi duō qiū cǎo luò yè mǎn jiē hóng bù sǎo lí yuán dì zǐ bái fà xīn jiāo fáng ā jiān qīng é lǎo xī diàn yíng fēi sī qiǎo rán gū dēng tiāo jìn wèi chéng mián chí chí zhōng gǔ chū cháng yè gěng gěng xīng hé yù shǔ tiān yuān yāng wǎ lěng shuāng huá zhòng fěi cuì qīn hán shuí yǔ gòng yōu yōu shēng sǐ bié jīng nián hún pò bù céng lái rù mèng lín qióng dào shì hóng dū kè néng yǐ jīng chéng zhì hún pò wèi gǎn jūn wáng zhǎn zhuǎn sī suì jiào fāng shì yīn qín mì pái kōng yù qì bēn rú diàn shēng tiān rù dì qiú zhī biàn shàng qióng bì luò xià huáng quán liǎng chù máng máng jiē bù jiàn hū wén hǎi shàng yǒu xiān shān shān zài xū wú piāo miǎo jiān lóu gé líng lóng wǔ yún qǐ qí zhōng chuò yuē duō xiān zǐ zhōng yǒu yī rén zì tài zhēn xuě fū huā mào cēn cī shì jīn què xī xiāng kòu yù jiōng zhuǎn jiào xiǎo yù bào shuāng chéng wén dào hàn jiā tiān zǐ shǐ jiǔ huá zhàng lǐ mèng hún jīng lǎn yī tuī zhěn qǐ pái huái zhū bó yín píng yǐ lǐ kāi yún bìn bàn piān xīn shuì jué huā guān bù zhěng xià táng lái fēng chuī xiān mèi piāo piāo jǔ yóu sì ní cháng yǔ yī wǔ yù róng jì mò lèi lán gān lí huā yī zhī chūn dài yǔ hán qíng níng dì xiè jūn wáng yī bié yīn róng liǎng miǎo máng zhāo yáng diàn lǐ ēn ài jué péng lái gōng zhōng rì yuè cháng huí tóu xià wàng rén huán chù bù jiàn cháng ān jiàn chén wù wéi jiāng jiù wù biǎo shēn qíng diàn hé jīn chāi jì jiāng qù chāi liú yī gǔ hé yī shàn chāi bāi huáng jīn hé fēn diàn dàn jiào xīn sì jīn diàn jiān tiān shàng rén jiān huì xiāng jiàn lín bié yīn qín chóng jì cí cí zhōng yǒu shì liǎng xīn zhī qī yuè qī rì cháng shēng diàn yè bàn wú rén sī yǔ shí zài tiān yuàn zuò bǐ yì niǎo zài dì yuàn wéi lián lǐ zhī tiān cháng dì jiǔ yǒu shí jìn cǐ hèn mián mián wú jué qī`
    }
};

// 文章页面逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 获取文章ID
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id') || '1';
    
    // 获取文章数据
    const article = articles[articleId];
    
    if (article) {
        // 更新页面标题和meta描述
        document.title = `${article.title} - 带拼音全文 | ${article.location} - 古文速记`;
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = `${article.title}带拼音全文，${article.location}。提供完整的带拼音古文和填空测试工具，帮助您快速背诵通过景区免票活动。`;
        
        // 渲染文章内容
        renderArticle(article);
        
        // 设置测试按钮
        setupQuizButton(articleId);
    } else {
        document.getElementById('article-content').innerHTML = `
            <div class="error-page">
                <h1>文章不存在</h1>
                <p>抱歉，您要查找的文章不存在。</p>
                <a href="index.html" class="back-home">返回首页</a>
            </div>
        `;
    }
    
    setupModal('licenseModal', 'restoreLicenseLink', '.close');
});

// 渲染文章内容
function renderArticle(article) {
    const container = document.getElementById('article-content');
    
    // 算平均行长（按换行分段，避免标题干扰）
    const lines = article.content.split('\n').filter(l => l.trim());
    const avgLen = lines.reduce((sum, l) => sum + l.length, 0) / lines.length;
    const isPoem = avgLen <= 20 && window.innerWidth >= 768;   // 20 字门槛可再调

    container.innerHTML = `
        <article class="article-detail">
            <div class="article-header">
                <h1>${article.title}</h1>
                <p class="article-meta">${article.author} | ${article.location}</p>
            </div>
            
            <div class="pinyin-controls">
                <button id="togglePinyin" class="pinyin-toggle-btn">显示拼音</button>
            </div>
            <div class="article-body hide-pinyin ${isPoem ? 'poem-mode' : ''}">
                ${generatePinyinContent(article.content, article.pinyin)}
            </div>
        </article>
    `;
    
    setupPinyinToggle();
}

// 生成逐字拼音内容（最终版）
function generatePinyinContent(content, pinyin) {
    // 规范化拼音数据：移除所有非拼音字符，只保留拼音和单个空格
    const normalizedPinyin = normalizePinyin(pinyin);
    
    // 将内容和拼音转换为数组
    const contentChars = content.split('');
    const pinyinArray = normalizedPinyin.split(' ').filter(p => p !== '');
    
    let result = '';
    let pinyinIndex = 0;
    
    for (let i = 0; i < contentChars.length; i++) {
        const char = contentChars[i];
        
        // 处理换行符
        if (char === '\n') {
            result += '<br>';
            continue;
        }
        
        // 判断是否为标点符号
        if (isPunctuation(char)) {
            result += `<span class="char-container punctuation"><span class="chinese-char">${char}</span></span>`;
            continue;
        }
        
        // 跳过空格等其他空白字符
        if (char.trim() === '') {
            result += `<span class="char-container"><span class="chinese-char">${char}</span></span>`;
            continue;
        }
        
        // 获取当前字符的拼音
        if (pinyinIndex < pinyinArray.length) {
            const currentPinyin = pinyinArray[pinyinIndex];
            result += `
                <span class="char-container">
                    <span class="pinyin-char">${currentPinyin}</span>
                    <span class="chinese-char">${char}</span>
                </span>
            `;
            pinyinIndex++;
        } else {
            result += `<span class="char-container"><span class="chinese-char">${char}</span></span>`;
        }
    }
    
    return `<div class="pinyin-content">${result}</div>`;
}

// 规范化拼音字符串
function normalizePinyin(pinyin) {
    return pinyin
        .replace(/[，。；！？、:：""“”\r\n]/g, ' ')  // 将标点和换行符替换为空格
        .replace(/\s+/g, ' ')                // 将多个空格合并为一个
        .trim();                             // 去除首尾空格
}

// 判断是否为标点符号
function isPunctuation(char) {
    return /[，。；！？、:：""“”]/.test(char);
}

// 设置拼音切换功能
function setupPinyinToggle() {
    const toggleBtn = document.getElementById('togglePinyin');
    const articleBody = document.querySelector('.article-body');
    
    if (toggleBtn && articleBody) {
        toggleBtn.addEventListener('click', function() {
        // 1. 先切换 class（hide-pinyin 存在表示“不显示”）
            articleBody.classList.toggle('hide-pinyin');
            // 2. 根据切换后的状态写文案和 aria-pressed
            const nowHide = articleBody.classList.contains('hide-pinyin');
            toggleBtn.textContent      = nowHide ? '显示拼音' : '隐藏拼音';
            toggleBtn.setAttribute('aria-pressed', nowHide ? 'false' : 'true');
        });
    }
}

// 设置测试按钮
function setupQuizButton(articleId) {
    const quizBtn = document.getElementById('startQuiz');
    
    if (quizBtn) {
        quizBtn.addEventListener('click', function() {
                window.location.href = `quiz.html?id=${articleId}`;
        });
    }
}

// 模态框通用逻辑
function setupModal(modalId, openBtnId, closeBtnClass) {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = modal ? modal.querySelector(closeBtnClass) : null;

    if (openBtn && modal) {
        openBtn.onclick = function() {
            modal.style.display = "block";
        }
    }

    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }
    }

    if (modal) {
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
}