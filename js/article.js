// 文章数据 - 岳阳楼记示例（移除拼音中的标点符号）
const articles = {
    1: {
        title: "滕王阁序",
        author: "唐 · 王勃",
        location: "南昌滕王阁背诵免票",
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
        location: "岳阳楼背诵免票",
        content: `庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废具兴。乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上。属予作文以记之。

予观夫巴陵胜状，在洞庭一湖。衔远山，吞长江，浩浩汤汤，横无际涯；朝晖夕阴，气象万千。此则岳阳楼之大观也，前人之述备矣。然则北通巫峡，南极潇湘，迁客骚人，多会于此，览物之情，得无异乎？

若夫淫雨霏霏，连月不开，阴风怒号，浊浪排空；日星隐曜，山岳潜形；商旅不行，樯倾楫摧；薄暮冥冥，虎啸猿啼。登斯楼也，则有去国怀乡，忧谗畏讥，满目萧然，感极而悲者矣。

至若春和景明，波澜不惊，上下天光，一碧万顷；沙鸥翔集，锦鳞游泳；岸芷汀兰，郁郁青青。而或长烟一空，皓月千里，浮光跃金，静影沉璧，渔歌互答，此乐何极！登斯楼也，则有心旷神怡，宠辱偕忘，把酒临风，其喜洋洋者矣。

嗟夫！予尝求古仁人之心，或异二者之为，何哉？不以物喜，不以己悲；居庙堂之高则忧其民；处江湖之远则忧其君。是进亦忧，退亦忧。然则何时而乐耶？其必曰“先天下之忧而忧，后天下之乐而乐”乎。噫！微斯人，吾谁与归？

时六年九月十五日。`,
        pinyin: `qìng lì sì nián chūn téng zǐ jīng zhé shǒu bā líng jùn yuè míng nián zhèng tōng rén hé bǎi fèi jù xìng nǎi chóng xiū yuè yáng lóu zēng qí jiù zhì kè táng xián jīn rén shī fù yú qí shàng shǔ yǔ zuò wén yǐ jì zhī

yǔ guān fū bā líng shèng zhuàng zài dòng tíng yī hú xián yuǎn shān tūn cháng jiāng hào hào shāng shāng héng wú jì yá cháo huī xī yīn qì xiàng wàn qiān cǐ zé yuè yáng lóu zhī dà guān yě qián rén zhī shù bèi yǐ rán zé běi tōng wū xiá nán jí xiāo xiāng qiān kè sāo rén duō huì yú cǐ lǎn wù zhī qíng dé wú yì hū

ruò fū yín yǔ fēi fēi lián yuè bù kāi yīn fēng nù háo zhuó làng pái kōng rì xīng yǐn yào shān yuè qián xíng shāng lǚ bù xíng qiáng qīng jí cuī bó mù míng míng hǔ xiào yuán tí dēng sī lóu yě zé yǒu qù guó huái xiāng yōu chán wèi jī mǎn mù xiāo rán gǎn jí ér bēi zhě yǐ

zhì ruò chūn hé jǐng míng bō lán bù jīng shàng xià tiān guāng yī bì wàn qǐng shā ōu xiáng jí jǐn lín yóu yǒng àn zhǐ tīng lán yù yù qīng qīng ér huò cháng yān yī kōng hào yuè qiān lǐ fú guāng yuè jīn jìng yǐng chén bì yú gē hù dá cǐ lè hé jí dēng sī lóu yě zé yǒu xīn kuàng shén yí chǒng rǔ xié wàng bǎ jiǔ lín fēng qí xǐ yáng yáng zhě yǐ

jiē fū yǔ cháng qiú gǔ rén rén zhī xīn huò yì èr zhě zhī wèi hé zāi bù yǐ wù xǐ bù yǐ jǐ bēi jū miào táng zhī gāo zé yōu qí mín chǔ jiāng hú zhī yuǎn zé yōu qí jūn shì jìn yì yōu tuì yì yōu rán zé hé shí ér lè yē qí bì yuē xiān tiān xià zhī yōu ér yōu hòu tiān xià zhī lè ér lè hū yī wēi sī rén wú shuí yǔ guī

shí liù nián jiǔ yuè shí wǔ rì`
    },
    3: {
        title: "黄鹤楼",
        author: "唐 · 崔颢",
        location: "武汉黄鹤楼背诵免票", 
        content: `昔人已乘黄鹤去，此地空余黄鹤楼。
黄鹤一去不复返，白云千载空悠悠。
晴川历历汉阳树，芳草萋萋鹦鹉洲。
日暮乡关何处是？烟波江上使人愁。`,
        pinyin: `xī rén yǐ chéng huáng hè qù cǐ dì kōng yú huáng hè lóu
huáng hè yī qù bù fù fǎn bái yún qiān zǎi kōng yōu yōu
qíng chuān lì lì hàn yáng shù fāng cǎo qī qī yīng wǔ zhōu
rì mù xiāng guān hé chù shì yān bō jiāng shàng shǐ rén chóu`
    },
    4: {
        title: "出师表",
        author: "三国 · 诸葛亮",
        location: "成都武侯祠背诵活动",
        content: `先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。

宫中府中，俱为一体；陟罚臧否，不宜异同。若有作奸犯科及为忠善者，宜付有司论其刑赏，以昭陛下平明之理，不宜偏私，使内外异法也。

侍中、侍郎郭攸之、费祎、董允等，此皆良实，志虑忠纯，是以先帝简拔以遗陛下。愚以为宫中之事，事无大小，悉以咨之，然后施行，必能裨补阙漏，有所广益。

将军向宠，性行淑均，晓畅军事，试用于昔日，先帝称之曰能，是以众议举宠为督。愚以为营中之事，悉以咨之，必能使行阵和睦，优劣得所。

亲贤臣，远小人，此先汉所以兴隆也；亲小人，远贤臣，此后汉所以倾颓也。先帝在时，每与臣论此事，未尝不叹息痛恨于桓、灵也。侍中、尚书、长史、参军，此悉贞良死节之臣，愿陛下亲之信之，则汉室之隆，可计日而待也。

臣本布衣，躬耕于南阳，苟全性命于乱世，不求闻达于诸侯。先帝不以臣卑鄙，猥自枉屈，三顾臣于草庐之中，咨臣以当世之事，由是感激，遂许先帝以驱驰。后值倾覆，受任于败军之际，奉命于危难之间，尔来二十有一年矣。

先帝知臣谨慎，故临崩寄臣以大事也。受命以来，夙夜忧叹，恐托付不效，以伤先帝之明；故五月渡泸，深入不毛。今南方已定，兵甲已足，当奖率三军，北定中原，庶竭驽钝，攘除奸凶，兴复汉室，还于旧都。此臣所以报先帝而忠陛下之职分也。至于斟酌损益，进尽忠言，则攸之、祎、允之任也。

愿陛下托臣以讨贼兴复之效，不效，则治臣之罪，以告先帝之灵。若无兴德之言，则责攸之、祎、允等之慢，以彰其咎；陛下亦宜自谋，以咨诹善道，察纳雅言，深追先帝遗诏。臣不胜受恩感激。

今当远离，临表涕零，不知所言。`,
        pinyin: `xiān dì chuàng yè wèi bàn ér zhōng dào bēng cú jīn tiān xià sān fēn yì zhōu pí bì cǐ chéng wēi jí cún wáng zhī qiū yě rán shì wèi zhī chén bù xiè yú nèi zhōng zhì zhī shì wàng shēn yú wài zhě gài zhuī xiān dì zhī shū yù yù bào zhī yú bì xià yě chéng yí kāi zhāng shèng tīng yǐ guāng xiān dì yí dé huī hóng zhì shì zhī qì bù yí wàng zì fěi bó yǐn yù shī yì yǐ sè zhōng jiàn zhī lù yě

gōng zhōng fǔ zhōng jù wéi yī tǐ zhì fá zāng pǐ bù yí yì tóng ruò yǒu zuò jiān fàn kē jí wéi zhōng shàn zhě yí fù yǒu sī lùn qí xíng shǎng yǐ zhāo bì xià píng míng zhī lǐ bù yí piān sī shǐ nèi wài yì fǎ yě

shì zhōng shì láng guō yōu zhī fèi yī dǒng yǔn děng cǐ jiē liáng shí zhì lǜ zhōng chún shì yǐ xiān dì jiǎn bá yǐ yí bì xià yú yǐ wéi gōng zhōng zhī shì shì wú dà xiǎo xī yǐ zī zhī rán hòu shī xíng bì néng bì bǔ quē lòu yǒu suǒ guǎng yì

jiāng jūn xiàng chǒng xìng xíng shū jūn xiǎo chàng jūn shì shì yòng yú xī rì xiān dì chēng zhī yuē néng shì yǐ zhòng yì jǔ chǒng wéi dū yú yǐ wéi yíng zhī shì xī yǐ zī zhī bì néng shǐ háng zhèn hé mù yōu liè dé suǒ

qīn xián chén yuǎn xiǎo rén cǐ xiān hàn suǒ yǐ xīng lóng yě qīn xiǎo rén yuǎn xián chén cǐ hòu hàn suǒ yǐ qīng tuí yě xiān dì zài shí měi yǔ chén lùn cǐ shì wèi cháng bù tàn xī tòng hèn yú huán líng yě shì zhōng shàng shū zhǎng shǐ cān jūn cǐ xī zhēn liáng sǐ jié zhī chén yuàn bì xià qīn zhī xìn zhī zé hàn shì zhī lóng kě jì rì ér dài yě

chén běn bù yī gōng gēng yú nán yáng gǒu quán xìng mìng yú luàn shì bù qiú wén dá yú zhū hóu xiān dì bù yǐ chén bēi bǐ wěi zì wǎng qū sān gù chén yú cǎo lú zhī zhōng zī chén yǐ dāng shì zhī shì yóu shì gǎn jī suì xǔ xiān dì yǐ qū chí hòu zhí qīng fù shòu rèn yú bài jūn zhī jì fèng mìng yú wēi nàn zhī jiān ěr lái èr shí yǒu yī nián yǐ

xiān dì zhī chén jǐn shèn gù lín bēng jì chén yǐ dà shì yě shòu mìng yǐ lái sù yè yōu tàn kǒng tuō fù bù xiào yǐ shāng xiān dì zhī míng gù wǔ yuè dù lú shēn rù bù máo jīn nán fāng yǐ dìng bīng jiǎ yǐ zú dāng jiǎng shuài sān jūn běi dìng zhōng yuán shù jié nú dùn rǎng chú jiān xiōng xīng fù hàn shì huán yú jiù dū cǐ chén suǒ yǐ bào xiān dì ér zhōng bì xià zhī zhí fèn yě zhì yú zhēn zhuó sǔn yì jìn jìn zhōng yán zé yōu zhī yī yǔn zhī rèn yě

yuàn bì xià tuō chén yǐ tǎo zéi xīng fù zhī xiào bù xiào zé zhì chén zhī zuì yǐ gào xiān dì zhī líng ruò wú xīng dé zhī yán zé zé yōu zhī yī yǔn děng zhī màn yǐ zhāng qí jiù bì xià yì yí zì móu yǐ zī zōu shàn dào chá nà yǎ yán shēn zhuī xiān dì yí zhào chén bù shèng shòu ēn gǎn jī

jīn dāng yuǎn lí lín biǎo tì líng bù zhī suǒ yán`
    },
    5: {
        title: "醉翁亭记",
        author: "宋 · 欧阳修",
        location: "滁州醉翁亭背诵活动",
        content: `环滁皆山也。其西南诸峰，林壑尤美，望之蔚然而深秀者，琅琊也。山行六七里，渐闻水声潺潺而泻出于两峰之间者，酿泉也。峰回路转，有亭翼然临于泉上者，醉翁亭也。作亭者谁？山之僧智仙也。名之者谁？太守自谓也。太守与客来饮于此，饮少辄醉，而年又最高，故自号曰醉翁也。醉翁之意不在酒，在乎山水之间也。山水之乐，得之心而寓之酒也。

若夫日出而林霏开，云归而岩穴暝，晦明变化者，山间之朝暮也。野芳发而幽香，佳木秀而繁阴，风霜高洁，水落而石出者，山间之四时也。朝而往，暮而归，四时之景不同，而乐亦无穷也。

至于负者歌于途，行者休于树，前者呼，后者应，伛偻提携，往来而不绝者，滁人游也。临溪而渔，溪深而鱼肥。酿泉为酒，泉香而酒洌；山肴野蔌，杂然而前陈者，太守宴也。宴酣之乐，非丝非竹，射者中，弈者胜，觥筹交错，起坐而喧哗者，众宾欢也。苍颜白发，颓然乎其间者，太守醉也。

已而夕阳在山，人影散乱，太守归而宾客从也。树林阴翳，鸣声上下，游人去而禽鸟乐也。然而禽鸟知山林之乐，而不知人之乐；人知从太守游而乐，而不知太守之乐其乐也。醉能同其乐，醒能述以文者，太守也。太守谓谁？庐陵欧阳修也。`,
        pinyin: `huán chú jiē shān yě qí xī nán zhū fēng lín hè yóu měi wàng zhī wèi rán ér shēn xiù zhě láng yá yě shān xíng liù qī lǐ jiàn wén shuǐ shēng chán chán ér xiè chū yú liǎng fēng zhī jiān zhě niàng quán yě fēng huí lù zhuǎn yǒu tíng yì rán lín yú quán shàng zhě zuì wēng tíng yě zuò tíng zhě shuí shān zhī sēng zhì xiān yě míng zhī zhě shuí tài shǒu zì wèi yě tài shǒu yǔ kè lái yǐn yú cǐ yǐn shǎo zhé zuì ér nián yòu zuì gāo gù zì hào yuē zuì wēng yě zuì wēng zhī yì bù zài jiǔ zài hū shān shuǐ zhī jiān yě shān shuǐ zhī lè dé zhī xīn ér yù zhī jiǔ yě

ruò fū rì chū ér lín fēi kāi yún guī ér yán xué míng huì míng biàn huà zhě shān jiān zhī zhāo mù yě yě fāng fā ér yōu xiāng jiā mù xiù ér fán yīn fēng shuāng gāo jié shuǐ luò ér shí chū zhě shān jiān zhī sì shí yě zhāo ér wǎng mù ér guī sì shí zhī jǐng bù tóng ér lè yì wú qióng yě

zhì yú fù zhě gē yú tú xíng zhě xiū yú shù qián zhě hū hòu zhě yìng yǔ lǚ tí xié wǎng lái ér bù jué zhě chú rén yóu yě lín xī ér yú xī shēn ér yú féi niàng quán wéi jiǔ quán xiāng ér jiǔ liè shān yáo yě sù zá rán ér qián chén zhě tài shǒu yàn yě yàn hān zhī lè fēi sī fēi zhú shè zhě zhōng yì zhě shèng gōng chóu jiāo cuò qǐ zuò ér xuān huá zhě zhòng bīn huān yě cāng yán bái fà tuí rán hū qí jiān zhě tài shǒu zuì yě

yǐ ér xī yáng zài shān rén yǐng sǎn luàn tài shǒu guī ér bīn kè cóng yě shù lín yīn yì míng shēng shàng xià yóu rén qù ér qín niǎo lè yě rán ér qín niǎo zhī shān lín zhī lè ér bù zhī rén zhī lè rén zhī cóng tài shǒu yóu ér lè ér bù zhī tài shǒu zhī lè qí lè yě zuì néng tóng qí lè xǐng néng shù yǐ wén zhě tài shǒu yě tài shǒu wèi shuí lú líng ōu yáng xiū yě`
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
    
    container.innerHTML = `
        <article class="article-detail">
            <div class="article-header">
                <h1>${article.title}</h1>
                <p class="article-meta">${article.author} | ${article.location}</p>
            </div>
            
            <div class="pinyin-controls">
                <button id="togglePinyin" class="pinyin-toggle-btn">隐藏拼音</button>
            </div>
            
            <div class="article-body with-pinyin">
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
        .replace(/[，。；！？、\r\n]/g, ' ')  // 将标点和换行符替换为空格
        .replace(/\s+/g, ' ')                // 将多个空格合并为一个
        .trim();                             // 去除首尾空格
}

// 判断是否为标点符号
function isPunctuation(char) {
    return /[，。；！？、]/.test(char);
}

// 设置拼音切换功能
function setupPinyinToggle() {
    const toggleBtn = document.getElementById('togglePinyin');
    const articleBody = document.querySelector('.article-body');
    
    if (toggleBtn && articleBody) {
        toggleBtn.addEventListener('click', function() {
            articleBody.classList.toggle('hide-pinyin');
            toggleBtn.textContent = articleBody.classList.contains('hide-pinyin') ? 
                '显示拼音' : '隐藏拼音';
        });
    }
}

// 设置测试按钮
function setupQuizButton(articleId) {
    const quizBtn = document.getElementById('startQuiz');
    
    if (quizBtn) {
        quizBtn.addEventListener('click', function() {
            const isPaidUser = localStorage.getItem('isPaidUser') === 'true';
            
            if (isPaidUser) {
                window.location.href = `quiz.html?id=${articleId}`;
            } else {
                alert('请先购买会员权限以解锁完整测试功能');
            }
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