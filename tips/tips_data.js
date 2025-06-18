const tips = [
  /*#####################################################
   * はじめに
   *#####################################################*/
  {
    category : "はじめに",
    datalist : [
      {
        "title" : "本Tipsの前提について",
        "data" : [
            "本Tipsは「株分けシステム」及び「CMTS運用管理システム」の開発を前提としたものである。",
            "これらは、SpringBootフレームワークを用いて構築されたWebアプリケーションであり、",
            "Java及びSpringBootのバージョンは、プロジェクト発足当時（2020年）に採用されたものに基づいている。",
            "以下を基礎として、各種ライブラリは導入時に動作可能な安定バージョンを採用している。",
            { "explain" : [
                "・java 11",
                "・SpringBoot 2.3.4",
            ]},
            "対象システムは既に運用中であり、大規模な仕様変更を容易に行うことはできないため、",
            "開発に際しては現在運用中のバージョン及び構成を前提とする。",
            "また、動作環境や運用要件の制約により、モダンな開発手法や一般的な設計指針と異なる実装が含まれている。",
            "可読性や保守性の観点から、現在の設計・実装を踏襲することを原則とする。",
            "そのため、モダンな技術スタックを前提とするプロジェクトにおいては、本Tipsの内容が適合しない可能性があることに留意されたい。"
        ]
      }
    ]
  },
  /*#####################################################
   * 共通（サーバサイド処理編）
   *#####################################################*/
  {
    category : "共通（サーバサイド処理編）",
    datalist : [
      {
        "title" : "SpringMVCのイロハ",
        "data" : [
            "Model-View-Controller（MVC）は、ソフトウェアの設計パターンの一つで、アプリケーションを以下の3つの部分に分けて開発する方法である。",
            { "explain" : [
                "・Model（モデル）",
                "	アプリケーションのデータやビジネスロジックを管理する層である。",
                "	データの取得や更新、計算などを担当する。",
            ]},
            { "explain" : [
                "・View（ビュー）",
                "	ユーザーに情報を表示する層であり、画面やUI要素がこれに当たる。",
                "	SpringMVCではThymeleafなどのテンプレートエンジンを使用してHTMLを動的に生成する。",
            ]},
            { "explain" : [
                "・Controller（コントローラ）",
                "	ユーザーの入力を受け取り、それに応じた処理を行う部分である。",
                "	モデルとビューをつなぎ、ユーザーのリクエストに対して適切なレスポンスを返す。",
            ]},
            "&nbsp;",
            "SpringMVCはこのMVCパターンに基づき、リクエストを受け取った際に適切なコントローラが処理を行い、",
            "その結果をビュー（画面）に渡してユーザーに表示する仕組みである。",
            { "diagram" : [
                "                        ┌──────────────────────┐                                ",
                "                        │                  ブラウザ                  │                                ",
                "                        └────┬─────────────────┘                                ",
                "                                  │                        ▲                                          ",
                "                   HTTPリクエスト ｜                        ｜  HTTPレスポンス                          ",
                "┌────────────────┼────────────┼────────────────────┐",
                "│ View層                         │                        │                                        │",
                "│                                │            ┌─────┴────┐  コントローラの指示で        │",
                "│                                │            │      Thymeleaf     │  画面データ(HTML)を生成する  │",
                "│                                │            └──────────┘                              │",
                "｜                                │                        ▲                                        │",
                "├────────────────┼────────────┼────────────────────┤",
                "│ Controller層                   ▼                        ｜                                        │",
                "│                      ┌─────────────────┴────┐                              │",
                "│                      │                  Controller                │  リクエストの受け付け        │",
                "│                      └────┬─────────────────┘  業務ロジックや画面生成指示  │",
                "│                                │                        ▲                                        │",
                "├────────────────┼────────────┼────────────────────┤",
                "│ Model層                        ▼                        ｜                                        │",
                "│                      ┌─────────────────┴────┐                              │",
                "│                      │                   Service                  │  業務ロジック                │",
                "│                      └────┬─────────────────┘  トランザクション            │",
                "│                                │                        ▲                                        │",
                "｜                                ▼                        ｜                                        │",
                "│                      ┌─────────────────┴────┐                              │",
                "│                      │                  Repository                │  データベースCRUD処理        │",
                "│                      └────┬─────────────────┘                              │",
                "│                                │                        ▲                                        │",
                "└────────────────┼────────────┼────────────────────┘",
                "                                  ▼                        ｜                                          ",
                "                        ┌─────────────────┴────┐                                ",
                "                        │                データベース                │                                ",
                "                        └──────────────────────┘                                ",
            ]},
            "&nbsp;",
            "h|コントローラの基本構成",
            "SpringMVCにおいて、コントローラはリクエストを受け取り、適切なテンプレートを返却する役割を担う。",
            "特に、Thymeleafを利用してHTMLを返す際、",
            "@GetMappingで一覧画面やフォーム画面を表示し、@PostMappingで送信されたデータを処理、その結果を表示する。",
            { "code" : [
                "@Controller",
                "public class HelloController {",
                "&nbsp;",
                "    @Autowired",
                "    private MessageService messageService;",
                "&nbsp;",
                "    // フォーム画面の表示",
                "    @GetMapping(&quot;/input&quot;)",
                "    public String showForm() {",
                "        return &quot;form&quot;; // src/main/resources/templates/form.html を表示",
                "    }",
                "&nbsp;",
                "    // フォームからのデータを受け取り、処理結果を表示",
                "    @PostMapping(&quot;/hello&quot;)",
                "    public String showGreeting(@RequestParam String name, Model model) {",
                "        String message = messageService.createMessage(name);",
                "        model.addAttribute(&quot;message&quot;, message); // テンプレートに値を渡す",
                "        return &quot;hello&quot;; // resources/templates/hello.html を表示",
                "    }",
                "}&nbsp;",
            ]},
            { "explain" : [
                "・GETリクエストでフォーム画面を返す",
                "	@GetMapping(&quot;/input&quot;)により、ユーザーがフォーム画面をリクエストした際に、form.htmlテンプレートが返される。",
                "	return &quot;form&quot;がその役割を果たす。",
            ]},
            { "explain" : [
                "・POSTリクエストでフォームデータを受け取り、処理結果を表示",
                "	フォームから送信されたデータは@RequestParamを使用して受け取る。",
                "	Modelオブジェクトを介して、サービスクラスで処理したメッセージをThymeleafテンプレートに渡し、最終的にhello.htmlが表示される。",
            ]},
            "h|サービス層との連携",
            "サービス層はビジネスロジックを担う層であり、コントローラから呼び出されて実際のデータ処理を行う。",
            "サービスは、ロジックをコントローラから切り離して可読性と再利用性を高める役割を持つ。",
            { "code" : [
                "@Service",
                "public class MessageService {",
                "&nbsp;",
                "    // メッセージを生成するビジネスロジック",
                "    public String createMessage(String name) {",
                "        return name + &quot;さん、こんにちは！&quot;;",
                "    }",
                "}&nbsp;",
            ]},
            { "explain" : [
                "・ビジネスロジックを担当",
                "	MessageServiceクラスでは、コントローラから渡された名前を基に挨拶メッセージを作成する。",
                "	サービス層がロジックを担うことで、コントローラは単純なデータの受け渡しだけに集中でき、アプリケーションの構造が明確になる。",
            ]},
            { "explain" : [
                "・サービスクラスの注入",
                "	コントローラの中で、@Autowiredを使ってサービスを注入することにより、コントローラはビジネスロジックをサービスクラスに委譲できる。",
            ]},
        ]
      },
      {
        "title" : "Form・Entity・Dtoの使い分けについて",
        "data" : [
            "Form・Entity・Dtoはすべてデータを保持・受渡しを行うためのオブジェクトであり、",
            "privateのプロパティと、プロパティへアクセスするためのgetter/setterによる構成が基本となる。",
            "見た目の構造は類似しており、特にシンプルな登録・更新・表示を行う画面構成においては、ほぼ同様のプロパティを持つこともある。",
            "しかし、それぞれの役割や責任範囲が異なるものであるため、用途に応じた使い分けを原則とする。",
            "本プロジェクトでは以下の方針に従って分類・実装を行う。",
            "h|Form",
            "画面との入出力に使用されるオブジェクトであり、主にController層で用いられる。",
            "入力バリデーションを担うほか、Service層へのデータの受け渡しも原則としてFormのまま使用する。",
            { "explain" : [
                "・画面入力に対するバリデーションを定義する。",
                "・画面の構成や入力項目に応じたプロパティを持ち、データベースのカラムとは一致しない場合も多い点に留意する。",
                "　カラムと一致させることを目的としてFormへ不要なプロパティを持たせることは、保守性を著しく損ねる。",
                "・ControllerからServiceへの引数や戻り値としても使用する。",
                "・Entityとの相互変換を基本とし、Dtoを中間に挟むのは必要な場合に限る。",
            ]},
            "h|Entity",
            "データベースとマッピングされる永続化オブジェクトであり、Repositoryを介してデータベース操作に使用される。",
            "原則として業務テーブルと一対一の関係を持つデータ構造として定義する。",
            { "explain" : [
                "・Spring Data JPAによりデータベースのテーブルとマッピングされる。",
                "・データベースのカラムに対応するプロパティを持つ。",
                "・Entityの使用はService層に限定し、Controller層へ受け渡すことは避ける。",
                "　これは責務の混在を防ぐとともに、トランザクション管理や永続化の観点からも重要である。",
            ]},
            "h|Dto (Data Transfer Object）",
            "FormやEntityに該当しないデータオブジェクトの全般をDtoと定義する。",
            "導入は必要最低限に留め、安易な多用は避けること。想定される利用例は以下の通り。",
            { "explain" : [
                "・複雑な変換処理など、段階的にオブジェクト構造を分離する必要がある場合",
                "・Controllerを経由して複数のServiceメソッドの呼び出す際、画面表示に使用しない中間データが必要な場合",
                "・入力ファイルの読み取り結果など、FormやEntity以外のデータソースから取得したデータの受渡しを行う場合",
            ]},
        ]
      },
      {
        "title" : "入力チェック（バリデーション）",
        "data" : [
            "標準的なSpringMVCアプリケーションでは、以下の流れが一般的である。",
            "　① フォームをサブミット（POST）",
            "　② 入力チェック",
            "　③ エラーがなければ次画面へ遷移、エラーがあれば入力画面に遷移してメッセージ表示",
            "この際、画面遷移はケースによりフォワードとリダイレクトを使い分けることとなる。",
            "&nbsp;",
            "一方、本システムではリダイレクトは極力使用せず、データの送信と画面遷移は別のアクションであるという設計思想に基づき、",
            "以下の流れを採用している。",
            "　① ajaxによる入力データの送信（POST）",
            "　② 入力チェック",
            "　③ エラーがあれば元の画面上にメッセージ表示し、エラーがなければ画面遷移用のフォームをサブミットして次画面へ遷移",
            "そのため、入力チェックを行うのは常にRESTのコントロールメソッドとなる。",
            { "code" : [
                "@ResponseBody",
                "public ResponseEntity&lt;?&gt; xxxxx(",
                "        @Validated @ModelAttribute XxxxForm xxxxForm,	// @ValidatedでFormクラスに設定したバリデーションが実行される",
                "        BindingResult result) {						// バリデーションの結果がBindingResultに入る",
                "    if (result.hasErrors()) {							// hasErrorsでエラー有無を判定できる",
                "        // ValidateErrorFormにセットして返すことでキーバリューのJSONへ自動変換される",
                "        return new ResponseEntity&lt;&gt;(",
                "                new ValidateErrorForm(result.getAllErrors()), HttpStatus.BAD_REQUEST);",
                "    }",
                "    return new ResponseEntity&lt;String&gt;(HttpStatus.OK);",
                "}&nbsp;",
            ]},
            "上記のValidateErrorFormで、作業件名と作業種別の必須エラーが設定された場合、",
            "クライアントへのレスポンスは以下のようなJSONが返される。",
            "同じフィールドに対するエラーが同時に発生する場合もあるため、フィールドごとのエラーは常に配列で返される。",
            { "reference" : [
                "{&nbsp;",
                "    &quot;messages&quot;:{",
                "        &quot;subject&quot;:[",
                "            &quot;作業件名は必須です。&quot;",
                "        ],",
                "        &quot;workKind&quot;:[",
                "            &quot;作業種別は1つに選んでください。&quot;",
                "        ]",
                "    }",
                "}&nbsp;",
            ]},
            "クライアントはデータ送信したajaxのエラー処理として、JSONのエラーオブジェクトを適切な表示位置へ設定する。",
            { "code" : [
                "$.ajax({",
                "    url: xxxx",
                "}).done(function() {",
                "    // 成功時処理",
                "}).fail(function(data) {",
                "    let responseTextObj = JSON.parse(data.responseText);	// responseTextをJSONにパース",
                "    if (responseTextObj.messages != undefined) {",
                "        const errorMessagesObj = responseTextObj.messages;	// messagesを取得",
                "        // エラーオブジェクト分繰り返して画面に表示",
                "        for (let key in errorMessagesObj) {",
                "            // キーがエラー項目名になっているので、項目名＋ErrorというIDの要素にメッセージ設定する",
                "            $('#' + key + 'Error').text(errorMessagesObj[key]);",
                "        }",
                "    }",
                "});"
            ]},,
            "作業件名の入力エラー時、上記スクリプトはHTML内の以下の要素にエラーメッセージを表示する。",
            { "code" : [
                "&lt;div class=&quot;error-message&quot; id=&quot;subjectError&quot;&gt;&lt;/div&gt;",
            ]},
        ]
      },
      {
        "title" : "ユーティリティの積極活用",
        "data" : [
            "NULL判定などの「よく使われる」チェック処理は、Apache Commonsの比較メソッドの利用を推奨する。",
            "個々に実装することが容易なものであっても、冗長になることや実装漏れが発生しやすく、独自実装のメリットは少ない。",
            "Apache Commonsが提供するユーティリティメソッドは広く使用されており、その信頼性は高いため、積極的に活用するべきである。",
            "例えば、使用頻度の高いメソッドとして以下のものがある。",
            { "explain" : [
                "・StringUtils.equals(str1, str2);",
                "・StringUtils.isEmpty(str);",
            ]},
            "これらのメソッドは、手動で比較やNULLチェックを行うよりも簡潔で意図が明確に伝わるため、コードの可読性が向上する。",
        ]
      },
      {
        "title" : "等価比較について",
        "data" : [
            "通常、オブジェクトの値の等価性を比較する場合は equals()を使用することを原則とする。",
            "等価演算子（==）は、参照の同一性を確認する用途に限定すべきであり、値の等価性を期待して使用することは避ける。",
            "&nbsp;",
            "プリミティブ型や列挙型以外の変数であっても、値が同じであれば常に同じインスタンスが使用されると保証されている場合に限り、",
            "等価演算子（==）による単純比較を許容する。",
            "これは、逆説的に言うと「同じインスタンスが保証されない変数に関しては等価演算子（==）による比較を許容しない」ということでもある。",
            { "explain" : [
                "(Integer.valueOf(1) == Integer.valueOf(1)) = true",
                "(new String(&quot;1&quot;) == new String(&quot;1&quot;)) = false",
            ]},
            "また、数値型やboolean型のプリミティブとラッパークラスは可読性を重視して暗黙的な型変換も認めることがある。",
            { "explain" : [
                "(Integer.valueOf(1) == 1) = true",
                "(Boolean.FALSE == false) = true",
            ]},
            "しかし、ラッパークラスのインスタンスには注意が必要である。",
            "例えば、Integer型は -128 ～ 127 の範囲でキャッシュされ、同じインスタンスが返される。",
            "それ以外の値では新しいインスタンスが返されるため、等価演算子（==）で比較しても等価とはならないことがある。",
            { "explain" : [
                "(Integer.valueOf(127) == 127) = true",
                "(Integer.valueOf(128) == 128) = false",
            ]},
            "また、ラッパークラスの値はnullの可能性があることにも留意すること。",
        ]
      },
      {
        "title" : "日付型について",
        "data" : [
            "日付型にはLocalDateまたはLocalDateTimeまたはを使用することを推奨する。",
            { "explain" : [
                "LocalDate	：	日付のみを扱う。",
                "LocalDateTime	：日付と時刻を扱う。内部的にはLocalDateとLocalTimeの組み合わせで構成されており、LocalDate型との比較も容易である。",
            ]},
            "従来のDate型及びCalendar型、特にDate型は現在の開発でも使用頻度が高いクラスであるが、",
            "日付の比較や操作が直感的ではなく、可読性が低下するため、特別な理由がない限り使用は避けるべきである。",
            "&nbsp;",
            "日付の比較にはisBefore()、isAfter()、isEqual()メソッドの活用が望ましい。",
            "これらのメソッドは、比較演算子（&gt; や &lt;）を用いる場合に比べて可読性が高く、比較の意図を明確に表現できる。",
            "&nbsp;",
            "例えば、「指定日付より前か」「後か」といった条件判定において、",
            "メソッド名によって意図が明示されるため、コードの理解が容易になり、ロジック上の誤りを防ぎやすくなる。",
            "例）",
            { "explain" : [
                "・today.isBefore(deadline);	・・・今日が締切日より前かを確認する",
                "・today.isAfter(deadline);	・・・今日が締切日より後かを確認する",
                "・today.isEqual(deadline);	・・・今日が締切日と同日かを確認する",
            ]},
        ]
      },
      {
        "title" : "Stream APIの活用",
        "data" : [
            "Stream APIは、配列やListといった要素の集合に対して一定の規則の処理を簡潔に行う仕組みである。",
            "Stream APIの記述は中間操作と終端操作に分かれる。",
            "h|中間操作：",
            "元のストリームを変換して、変換後のストリームを返す操作である。",
            "中間操作は連続的に呼び出すことができ、フィルタリング→型変換→並び替え、といった順序立てた処理が可能である。",
            "中間操作には以下が用意されているため、適切に使い分けることが重要である。",
            { "explain" : [
                "h|・filter",
                "	絞り込みを行った結果のストリームを返す。",
                "	booleanを返す関数を設定し、trueの要素のみが結果に追加される。",
                "h|・map",
                "	変換を行った結果のストリームを返す。",
                "	T→Rのように要素の型を変える、または、元の型であっても内容を変えて新しいインスタンスにすることを目的とする。",
                "	元のインスタンスへ副作用を伴う処理（既存オブジェクトのフィールド更新など）を行う場合はpeekを選択するべきである。",
                "h|・flatMap",
                "	ストリームの要素を別のストリームへ変換し、マージした単一のストリームを返す。",
                "	例えば、List&lt;Set&lt;String&gt;&gt;の変数をStream APIで処理する場合に、",
                "	flatMap(Set::stream)を行うことで、すべてのListのSet内にあるString要素のストリームを得ることができる。",
                "h|・peek",
                "	元のストリームを返す。",
                "	本来はデバッグ用の中間操作であるため、ログ出力などを行うことが適切だが、",
                "	元のインスタンスのままとなる特性から、本プロジェクトでは副作用を伴う処理（既存オブジェクトのフィールド更新など）への仕様を容認する。",
                "h|・distinct",
                "	重複要素を取り除いたストリームを返す。",
                "	重複していることはオブジェクトのequals()メソッドによって判断されるため、",
                "	何をもって同一と見做すか留意してequals()メソッドをオーバーライドする必要がある。",
                "h|・sorted",
                "	指定されたコンパレータに従って並び替えたストリームを返す。",
                "	引数なしの場合は自然順序付けとなるため、プリミティブ型や文字列型の単純な並び替えのみに利用する。",
                "	オブジェクトの並び替えや、特殊な条件での並び替えを行う場合には必ずコンパレータを利用する必要がある。",
                "h|・skip",
                "	先頭から指定された個数分を廃棄して、残りの要素で構成されたストリームを返す。",
                "h|・limit",
                "	指定された上限値に収まるように切り詰めたストリームを返す。",
            ]},
            "h|終端操作：",
            "ストリームから値を取り出す操作であり、これによってストリームが閉じられる。",
            { "explain" : [
                "h|	・forEach",
                "h|	・count",
                "h|	・allMatch",
                "h|	・anyMatch",
                "h|	・noneMatch",
                "h|	・max",
                "h|	・min",
                "h|	・findFirst",
                "h|	・findAny",
                "h|	・forEach",
                "h|	・collect",
            ]},
            "これらの処理の流れを宣言的に記述できるため、for文に比べて意図が明確で可読性の高いコードが書ける。",
            "その典型的な活用例として、Entityの一覧からFormの一覧に変換する処理が挙げられる。",
            { "code" : [
                "List&lt;TestForm&gt; formList = testEntityList",
                "		.stream().map(TestForm::new).collect(Collectors.toList());",
            ]},
            "他にも、条件に合致する要素のカウントや、最初に合致する1件取得といった処理も簡潔に書ける。",
            { "code" : [
                "// 条件に合致する要素のカウント",
                "long activeCount = testEntityList",
                "		.stream().filter(TestForm::isActive).count();",
                "&nbsp;",
                "// 最初に合致する1件取得（Optionalで返る）",
                "Optional&lt;TestEntity&gt; firstEntity = testEntityList",
                "		.stream().filter(TestEntity::isActive).findFirst();"
            ]},
        ]
      },
      {
        "title" : "Excelファイルの出力方式",
        "data" : [
            "本システムは複数のExcelファイルの出力機能を有する。",
            "※Excelファイルをベースに運用管理されていた業務のシステム化が大きな目的の一つである。",
            "h|ダウンロードファイル名",
            "　　ダウンロードファイル名はクライアント側ではなく、サーバ側で設定するべきである。",
            "　　ファイルダウンロード用のユーティリティとして ProvUtil 及び CmtsUtil にファイル名設定メソッドを用意されているので、これを利用すること。",
            { "code" : [
                "public ResponseEntity&lt;byte[]&gt; download(HttpServletResponse response) {		// 引数にHttpServletResponseを受け取る",
                "    CmtsUtil.setFileNameHeader(response, fineName);						// ファイル名をレスポンスヘッダに設定",
                "    return new ResponseEntity&lt;byte&gt;(xxxxService.download(), HttpStatus.OK);	// 戻り値はReponseEntityにファイルのbyte配列を設定",
                "} ",
            ]},
            "ダウンロードするバイナリデータの生成は、出力ファイルの性質により、2種類の実装方式から適切に選定する。",
            "h|定型フォーマットのファイル",
            "　　定型フォーマットのファイルについては、JXLSライブラリを用いたテンプレート処理によるファイル出力を行う。",
            "　　JXLSの書式に則ったテンプレートファイルを用意し、出力データとなるビーンリストの変換を行う。",
            { "code" : [
                "@Autowired",
                "private OutputExcelFileService outputExcelFileService;						// Excelファイル出力サービスをインジェクト",
                "&nbsp;",
                "public byte[] download() {",
                "    try {",
                "        Collection&lt;XxxxForm&gt; xxxxList = xxxx();",
                "        return outputExcelFileService.createExcelFile(&quot;jxls/XXXX.xlsx&quot;, xxxxList);	// テンプレート名と出力データのコレクションを指定",
                "    } catch (IOException e) {",
                "        throw new CmtsFileDownloadException(e);",
                "    }",
                "} ",
            ]},
            "h|動的フォーマットのファイル",
            "　　動的フォーマットのファイルについては、出力の項目名や項目数（列数）が変動するため、JXLSを利用するメリットが皆無となる。",
            "　　この場合、Apache POIを直接使用して手動でファイルの出力を行う。",
            "　　ただし、客指定のマクロやシートの追加が必要となるケースが存在する。",
            "　　そのため、この場合も以下のようにテンプレートファイルからワークブックを取得してファイル生成を行うことを基本とする。",
            { "code" : [
                "try (InputStream is = outputExcelFileService.getImputStream(&quot;jxls/XXXX.xlsm&quot);",
                "        XSSFWorkbook workbook = new XSSFWorkbook(is);",
                "        ByteArrayOutputStream baos = new ByteArrayOutputStream()) {",
                "    // ファイル出力処理",
                "}&nbsp;",
            ]},
        ]
      },
      {
        "title" : "JXLSテンプレートの仕様",
        "data" : [
            "JXLSのテンプレート設定は少し特殊であるため、本項で要点を説明する。",
            "JXLSのテンプレートファイルはExcelファイルの形式で作成され、",
            "主に「テンプレートエリア範囲」「繰り返し範囲」「セル内容」の定義を行う。各定義は以下の方法で設定する。",
            "h|テンプレートエリア範囲",
            { "explain" : [
                "A1セルにExcelの「メモ」機能を使ってマークアップする。",
                "例えば、テンプレート範囲がF列の2行目までの場合、以下をメモに追加する。（デフォルトで入力される「作成者:」などはそのままでも構わない）",
            ]},
            { "code" : [
                "jx:area(lastCell=&quot;F2&quot;)",
            ]},
            { "explain" : [
                "これにより、JXLSがA1からF2までの範囲をテンプレートと認識する。",
            ]},
            "h|繰り返し範囲",
            { "explain" : [
                "データ行の開始セルにExcelの「メモ」機能を使ってマークアップする。",
                "例えば、データ行が2行目のF列までの場合、以下をメモに追加する。（デフォルトで入力される「作成者:」などはそのままでも構わない）",
            ]},
            { "code" : [
                "jx:each(items=&quot;beanList&quot; var=&quot;search&quot; lastCell=&quot;F2&quot;)",
            ]},
            { "explain" : [
                "これにより、JXLSがA2からF2までの範囲をデータの繰り返し範囲と認識する。",
                "また、ここでは合わせてJXLSに受渡しするビーンリストの名前（items）と、繰り返し時の一行分のデータを格納する変数名（var）も定める。",
                "本システムではExcel出力のユーティリティメソッドで共通化した実装を行っているため、",
                "itemsは「beanList」で固定となる。varはセル内容の設定で用いるため、任意の適切な名前とするのが望ましい。",
            ]},
            "h|セル内容",
            { "explain" : [
                "セル内容については、直接対象のセル値としてJEXL構文によるオブジェクトプロパティ参照を設定する。",
            ]},
            { "code" : [
                "${search.subject}",
            ]},
            { "explain" : [
                "ここでのsearchは前述の繰り返し範囲におけるvarの名称、subjectはitemsに渡されたオブジェクトのプロパティ名称を指定する。",
            ]},
        ]
      },
      {
        "title" : "セッション管理について※未作成",
        "data" : [
            "ｘｘｘｘｘｘｘ",
        ]
      },
      {
        "title" : "非同期処理の呼び出しについて",
        "data" : [
            "通常、並列処理などのスレッド管理はフレームワークに任せることが基本であるが、",
            "パフォーマンス上の理由や処理の制御の都合により、やむを得ない場合は非同期処理（別スレッドでの呼び出し）を容認する。",
            "非同期処理の実装及び呼び出し方法は、次の３つの方法のうち目的に応じて選定する。",

            "h|parallelStream",
            "コレクションに対する簡易な並列処理である。スレッド管理や例外制御が難しく、軽量処理向き。",
            { "code" : [
                "list.parallelStream().forEach(this::process);",
            ]},
            { "explain" : [
                "通常、デフォルトのForkJoinPool（CPU数−1スレッド）が利用される。",
                "これを超える処理はキュー待ちとなるため、長時間処理の場合はスレッドが詰まりやすい。",
                "並列数を変更するには、独自のForkJoinPoolにsubmit()して使用する。",
                "ForkJoinPoolは必ず使用後に明示的にシャットダウンする必要がある。",
            ]},
            { "code" : [
                "ForkJoinPool pool = new ForkJoinPool(poolSize);",
                "try {",
                "    pool.submit(() -> list.parallelStream().forEach(this::process)).get();",
                "} catch (ExecutionException e) {",
                "    // 例外処理",
                "} catch (InterruptedException e) {",
                "    // 例外処理",
                "} finally {",
                "    pool.shutdown();",
                "}",
            ]},

            "h|ExecutorService.submit(callback) ※非推奨",
            "明示的なスレッド制御を行いたい単一非同期処理に使用する。処理中の例外を捕捉し、適切にハンドリング可能である。",
            { "code" : [
                "CallbackProcess callbackProcess = new CallbackProcess();",
                "ExecutorService executor = Executors.newSingleThreadExecutor();",
                "Future&lt;String&gt; future = executor.submit(callbackProcess);",
                "String result = future.get();",
                "executor.shutdown();",
            ]},
            { "explain" : [
                "callbackProcessが完了するまでは待機が発生するが、上記の実装では待機に制限がない。",
                "処理時間に上限を設けたい場合、以下のようにタイムアウト時間を設定する。",
            ]},
            { "code" : [
                "String result = future.get(5, TimeUnit.SECONDS);",
            ]},
            { "explain" : [
                "この方式では明示的にリソースをシャットダウンする必要がある。",
                "実装ミスでスレッドが解放されない場合、リソース枯渇により運用に支障を来す恐れがあるため、",
                "原則として非推奨とし、後述のCompletableFuture.supplyAsync(supplier)の利用を推奨する。",
            ]},
            

            "h|CompletableFuture.supplyAsync(supplier)",
            "明示的なスレッド制御を行いたい単一非同期処理に使用する。処理中の例外を捕捉し、適切にハンドリング可能である。",
            { "code" : [
                "SupplierProcess supplierProcess = new SupplierProcess();",
                "CompletableFuture&lt;String&gt; future = CompletableFuture.supplyAsync(supplierProcess)",
                "        .orTimeout(5, TimeUnit.SECONDS);",
                "&nbsp;",
                "String result = future.get();",
            ]},
            { "explain" : [
                "この方式では、処理の完了を待機する間に、独自の条件で中断処理を挟むことも可能である。",
            ]},
            { "code" : [
                "SupplierProcess supplierProcess = new SupplierProcess();",
                "CompletableFuture&lt;String&gt; future = CompletableFuture.supplyAsync(supplierProcess)",
                "        .orTimeout(5, TimeUnit.SECONDS);",
                "&nbsp;",
                "while (!future.isDone()) {",
                "    if (isCancelCondition) {",
                "        future.cancel(true);",
                "    }",
                "}",
                "String result = future.get();",
            ]},
            { "explain" : [
                "通常はparallelStreamと同様に、デフォルトのForkJoinPool（CPU数−1スレッド）が利用される。",
                "これを超える処理はキュー待ちが発生しやすいため、",
                "必要に応じてThreadPoolTaskExecutorをSpring Beanとして定義し、使用することで制御が可能である。",
            ]},
            { "code" : [
                "@Bean",
                "public ThreadPoolTaskExecutor taskExecutor() {",
                "    ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();",
                "    taskExecutor.setCorePoolSize(5);",
                "    taskExecutor.setMaxPoolSize(5);",
                "    taskExecutor.initialize();",
                "    return taskExecutor;",
                "}",
            ]},
            { "code" : [
                "SupplierProcess supplierProcess = new SupplierProcess();",
                "CompletableFuture&lt;String&gt; future = CompletableFuture.supplyAsync(supplierProcess, taskExecutor)",
                "        .orTimeout(5, TimeUnit.SECONDS);",
                "&nbsp;",
                "String result = future.get();",
            ]},
            "",
        ]
      },
      {
        "title" : "ｘｘｘｘ",
        "data" : [
            "ｘｘｘｘｘｘｘ",
        ]
      },
    ]
  },
  /*#####################################################
   * 共通（アノテーションリファレンス）
   *#####################################################*/
  {
    category : "共通（アノテーションリファレンス）",
    datalist : [
    ]
  },
  /*#####################################################
   * 共通（クライアントサイド編）
   *#####################################################*/
  {
    category : "共通（クライアントサイド編）",
    datalist : [
      {
        "title" : "DOM操作について",
        "data" : [
            "DOMへのアクセスはjQueryによる操作を基本とする。",
            "現在の主流はjQueryを使わない「脱jQuery」の方向であるが、過去にIEをサポートしていた経緯から、プロジェクトではjQueryを引き続き採用する。",
            "プレーンJavaScript（純粋なJS）によるDOM操作との混在は、メンテナンス性の低下やバグの温床となる可能性があるため、可能な限り避けるべきである。",
            "jQueryで実現可能な操作は、基本的にjQueryを使用することを推奨する。",
            "例えば、id=&quot;test&quot;の要素を操作する場合のアクセスの例は以下の通りである。",
            { "explain" : [
                "×　document.getElementById('test');",
                "○　$('#test');",
            ]},
            "ただし、プレーンJavaScriptのDOM要素を操作するライブラリへの受渡し等についてはこの限りではない。",
        ]
      },
      {
        "title" : "var/const/letの使い分け",
        "data" : [
            "JavaScriptにおける変数宣言は、var、let、constの3つのキーワードが存在する。",
            "開発時には、これらの特性を正しき認識し、意図しない挙動を避けることが重要である。",
            "基本的には以下を遵守すること。",
            { "explain" : [
                "const	：	値を再代入しない変数",
                "let		：	値を再代入する可能性がある変数",
                "var		：	特別な事情がない限り使用を避ける",
            ]},
            "h|例1：再代入の必要がない変数",
            { "code" : [
                "const MAX_RETRY_COUNT = 3;",
                "const colors = ['red', 'green', 'blue'];",
                "colors.push('yellow');",
            ]},
            "上記のように、スコープ内で値が変化しないことが明確なものはすべてconstで宣言することが推奨される。",
            "また、配列やオブジェクトにおいては、constで宣言を行っても中身の操作は可能である。",
            "h|例2：再代入の必要がある変数",
            { "code" : [
                "let counter = 0;",
                "counter += 1;",
            ]},
            "ループのカウンタや、状態が変化する一時変数などはletを用いる。",
            "h|例3：避けるべきvar",
            { "code" : [
                "var message = 'Hello';",
                "var message = 'World'; // 再宣言されてもエラーにならない",
            ]},
            "このように、同一スコープでの再宣言が許容されてしまうため、可読性と保守性を損なう。現代の開発ではvarを使う必要性はほぼない。",
        ]
      },
      {
        "title" : "JavaScriptの変数スコープ",
        "data" : [
            "スコープは変数が「どの範囲で有効であるか」を示す概念であり、JavaScriptでは以下に分類される。",
            { "explain" : [
                "・グローバルスコープ	：	スクリプト全体からアクセス可能",
                "・関数スコープ		：	関数内のみで有効",
                "・ブロックスコープ	：	if文やfor文などの、波括弧{}内のみで有効",
            ]},
            "&nbsp;",
            "以下は、それぞれのスコープを示す一例である。",
            { "code" : [
                "const globalValue = 'グローバルスコープ'; // グローバルスコープ",
                "&nbsp;",
                "const exampleFunction = function() {",
                "    const functionValue = '関数スコープ'; // 関数スコープ",
                "&nbsp;",
                "    if (true) {",
                "        const blockValue = 'ブロックスコープ'; // ブロックスコープ",
                "&nbsp;",
                "        console.log(globalValue);     // → 'グローバルスコープ'",
                "        console.log(functionValue);   // → '関数スコープ'",
                "        console.log(blockValue);      // → 'ブロックスコープ'",
                "    }",
                "&nbsp;",
                "    // console.log(blockValue); // ReferenceError: blockValue is not defined",
                "};",
                "&nbsp;",
                "exampleFunction();",
                "&nbsp;",
                "// console.log(functionValue); // ReferenceError: functionValue is not defined",
            ]},
            "この例で変数スコープの違いが示されている。",
            { "explain" : [
                "・grobalValue	：	グローバルスコープ（関数やブロックの外）に定義しており、どの関数やブロックの中からでも参照可能である。",
                "・functionValue	：	関数スコープに（関数の中）に属しており、定義された関数内でのみ参照可能である。",
                "・blockValue	：	ブロックスコープに属しており、if文の波括弧{}内のみで参照可能である。",
            ]},
            "constまたはletを用いた場合、変数が宣言されたスコープに厳密に閉じる。",
            "この性質により、意図しない変数の衝突や再代入を防ぐことができるため、安全性の高いコードを書くことが出来る。",
            "一方で、varは関数スコープのみを持ち、ブロックスコープとして利用できないキーワードである。",
            "そのため、上記のblockValueをvarで宣言した場合、if文ブロックの外からもアクセス可能となってしまう。",
            { "code" : [
                "const exampleFunction = function() {",
                "    if (true) {",
                "        var blockValue = 'varによる宣言'; // 実際には関数スコープ",
                "    }",
                "&nbsp;",
                "    console.log(blockValue); // → 'varによる宣言'",
                "};",
            ]},
            "このように、varを用いるとスコープの予測が困難となり、意図しないバグの原因となる可能性が高くなる。",
            "そのため、スコープ管理の観点からもvarは使用は原則として避けるべきである。"
        ]
      },
      {
        "title" : "ファンクションの定義方法",
        "data" : [
            "JavaScriptにおける関数の定義方法には、関数宣言と関数式の２つの記法がある。",
            "関数宣言は、JavaScriptを学習する際に必ず触れる基本的な構文であり、広く使用されている記法である。",
            { "code" : [
                "function checkData() {",
                "    // 処理",
                "}",
            ]},
            "しかし、現在では以下のような関数式を使用した定義が推奨されることが多い。",
            { "code" : [
                "const checkData = function() {",
                "    // 処理",
                "};",
            ]},
            "h|関数宣言より関数式を選ぶ理由",
            { "explain" : [
                "・巻き上げを防げる",
                "	関数宣言はスコープの先頭に巻き上げら、定義より前に参照可能となるが、",
                "	関数式は定義前に参照することができないため、意図しない挙動を避けられる。",
                "	巻き上げとは、関数がコードの記述位置よりも前のタイミングで有効となる仕組みであり、",
                "	一見便利に思えるが、意図しない順序で実行される原因となりやすいため、可読性や保守性に影響を与える。",
                "	そのため、関数式を使用することが一般的に推奨される。",
            ]},
            { "explain" : [
                "・スコープの明示性",
                "	無名関数をconstに代入することで、関数のスコープが明確となる。",
                "	これにより、関数の有効範囲を意図的に管理できる。",
                "	（スコープの詳細は「JavaScriptの変数スコープ」の項を参照）",
            ]},
            { "explain" : [
                "・名前の重複を防げる",
                "	関数宣言では同じ名前の関数が複数定義されていると、後に定義された関数が前の関数を上書きする。",
                "	この動作は予期しない結果を引き起こす可能性があり、問題の特定が難しくなる。（重複していることはエラー等で示されない）",
                "	一方、constを使用した関数式では、再代入が禁止されるため、関数名の重複や意図しない再定義を防ぐことができる。",
                "	同じ名前で再代入が行われると、JavaScriptでエラーが発生し、問題の特定が容易になる。",
            ]},
            { "explain" : [
                "・可読性と一貫性",
                "	constを使用した関数式は、他の変数定義と同じ形式となるため、コード全体の統一感が生まれ、可読性が向上する。",
                "	これにより、関数定義のスタイルが他のコードと一貫性を保ち、コードの理解がしやすくなる。",
            ]},
        ]
      },
      {
        "title" : "HTTPリクエストメソッドの使い分け",
        "data" : [
            "HTTPリクエスト時のメソッド（GET/POST/DELETE）は、リクエストの目的に応じて適切に選定すべきである。",
            "（本システムではPUTメソッドは原則利用しない）",
            "h|・GET   ：",
            "　　データを取得する際に用いられるメソッドである。主にリソースの取得や検索に用いられる。",
            "h|・POST  ：",
            "　　データを送信する際に用いられるメソッドである。主にリソースの作成や更新に用いられる。",
            "h|・DELETE：",
            "　　データを削除する際に用いられるメソッドである。リソースの削除に用いられる。",
            "&nbsp;",
            "ここでいう「取得」「送信」とは画面を表示することや、入力項目の有無を指すものではなく、それぞれのリクエストの役割を指すことに留意すること。",
            "以下に、本システムの標準的な画面リクエストにおける使い分けを説明する。",
            "h|・一覧画面の検索：",
            "　　GETが適切である。検索条件を送信するが、これはデータ取得の指示であり、GETパラメータとして送信されるべき情報である。",
            "h|・一覧画面での選択した項目の削除：",
            "　　DELETEが適切である。HTMLの&lt;form&gt;はDELETEをサポートしていないが、役割を明示的にするためajaxによるDELETEリクエストを行う。",
            "h|・登録または更新画面の初期表示：",
            "　　GETが適切である。画面の表示時点では、入力フォームの表示を指示している。",
            "h|・登録または更新画面の入力データの送信：",
            "　　POSTが適切である。これはユーザが入力したデータをサーバ側へ送信する役割を持っている。",
            "h|・登録または更新画面から確認画面への遷移：",
            "　　POSTが適切である。入力データをもって確認画面へ進む指示の送信であり、セキュリティの観点からもGETで行うべきではない操作である。",
            "h|・確認画面での登録または反映操作：",
            "　　POSTが適切である。これは入力データをDBに書き込む指示であり、セキュリティの観点からもGETで行うべきではない操作である。",
        ]
      },
      {
        "title" : "POST/DELETEメソッドのセキュリティ",
        "data" : [
            "本システムはCSRF（クロスサイトリクエストフォージェリ）チェックが有効化されているため、",
            "正常なCSRFトークンを含まないPOST/DELETEリクエストは無効となる。",
            "CSRFトークンが無効の場合、そのリクエストは405エラーとなり、アプリケーションのログに以下のメッセージが出力される。",
            "r|Resolved [org.springframework.web.HttpRequestMethodNotSupportedException: Request method 'POST' not supported]",
            "&nbsp;",
            "h|&lt;form&gt;が存在する場合：",
            "　　&lt;form&gt;タグにth:action属性を設定することで、自動的にフォーム内にCSRFトークンが生成される。",
            "　　フォームを送信するか、ajaxのデータとしてフォームデータを送信することで、トークンの認証が通る。",
            "h|&lt;form&gt;が存在しない場合：",
            "　　HTMLヘッダに以下のコードを追加することで、CSRFトークンが生成される。",
            { "code" : [
                "&lt;meta name=&quot;_csrfToken&quot; th:content=&quot;${_csrf.token}&quot;/&gt;",
            ]},
            "　　ajax の送信データとして<code>_csrf</code>を追加することで、トークンの認証が通る。",
            { "code" : [
                "$.ajax({",
                "    url: xxxxxxxxxxxx,",
                "    type: 'post',",
                "    data: {",
                "        _csrf: $('[name=_csrfToken').attr('content')",
                "    }",
                "}).done(function() {",
                "    // 成功時処理",
                "})",
            ]},
        ]
      },
      {
        "title" : "&lt;template&gt;タグによる動的な表示切替",
        "data" : [
            "&lt;template&gt;タグは、ウェブページの要素の動的な切り替えを効率的に行うことに適する。",
            "該当のタグはページの表示時点では描画されず、フォームデータの送信などにも影響を与えることがない。",
            "JavaScriptにより繰り返し利用可能なコンポーネントとしての性質を持つ。",
            "例えば、セレクトボックスの選択に応じて、動的にチェックボックスの選択肢を切り替える、といった場合に以下のように実装できる。",
            { "code" : [
                "&lt;select id=&quot;condition&quot;&gt;",
                "    &lt;option value=&quot;condition1&quot;&gt;condition1&lt;/option&gt;",
                "    &lt;option value=&quot;condition2&quot;&gt;condition2&lt;/option&gt;",
                "&lt;/select&gt;",
                "&lt;div id=&quot;checkArea&quot;&gt;&lt;/div&gt;",
                "",
                "&lt;template id=&quot;condition1&quot;&gt;",
                "    &lt;label&gt;&lt;input type=&quot;checkbox&quot; value=&quot;value1&quot;&gt;value1&lt;/label&gt;",
                "    &lt;label&gt;&lt;input type=&quot;checkbox&quot; value=&quot;value2&quot;&gt;value2&lt;/label&gt;",
                "&lt;/template&gt;",
                "&lt;template id=&quot;condition2&quot;&gt;",
                "    &lt;label&gt;&lt;input type=&quot;checkbox&quot; value=&quot;value1&quot;&gt;value3&lt;/label&gt;",
                "    &lt;label&gt;&lt;input type=&quot;checkbox&quot; value=&quot;value2&quot;&gt;value4&lt;/label&gt;",
                "&lt;/template&gt;",
            ]},
            { "code" : [
                "$('#condition').change(function () {",
                "    $('#checkArea').html($('#' + $('#condition').val()).html());",
                "});",
            ]},
            "この場合、conditionに選択された値と同じIDを持つ&lt;template&gt;タグ内の要素がcheckAreaに表示されることになる。",
            "このように&lt;template&gt;タグをそのまま使う場合は問題ないが、",
            "表示するデータや属性はJavaScriptにより動的にする必要があるが、タグ構成のみ利用したい、といったユースケースもある。",
            "その場合、&lt;templarte&gt;タグを書き換えてしまうと再利用で不都合が生じやすいため、必ずcloneしてから利用することが推奨される。",
            { "code" : [
                "$('#condition').change(function () {",
                "    const cloneTemplate = $('#' + $('#condition').val()).clone();",
                "});",
            ]},
            "尚、同様の内容は&lt;div&gt;タグ等を用いて実装することも可能であるが、",
            "&lt;template&gt;タグの最大の利点は、その内容がページの表示時点ではDOMに挿入されず、描画対象にもならない点にある。",
            "一方、&lt;div&gt;タグ等は<code>display:none;</code>により非表示にしても、要素自体はDOMに存在し描画処理の対象となるため、パフォーマンスへの影響が避けられない。",
            "特に、複雑な構造や大量の要素を含む場合は、描画負荷やリソース消費に注意が必要となる。",
            "&nbsp;",
            "&lt;template&gt;タグはそのような不要な描画やイベント処理の対象とならず、",
            "JavaScriptにより必要なタイミングで複製・挿入することを前提としている。",
            "また、再利用可能な構造の定義を目的として設計されているため、保守性の観点からも&lt;template&gt;タグの使用が推奨される。",
        ]
      },
      {
        "title" : "ｘｘｘｘ",
        "data" : [
            "ｘｘｘｘｘｘｘ",
        ]
      },
    ]
  },
  /*#####################################################
   * 共通（データベース操作編）
   *#####################################################*/
  {
    category : "共通（データベース操作編）",
    datalist : [
      {
        "title" : "JPAの利用",
        "data" : [
            "本システムではSpring Data JPAを採用しており、各テーブル用のリポジトリクラスは以下を必ず継承する。",
            "・JpaRepository",
            "・JpaSpecificationExecutor",
            { "code" : [
                "public interface TestRepository extends JpaRepository&lt;TestEntity, TestKey&gt;, JpaSpecificationExecutor&lt;TestEntity&gt; {}"
            ]},
            "&nbsp;",
            "JpaRepositoryはJPAの基本操作を提供し、JpaSpecificationExecutorは動的条件の操作用インターフェースである。",
            "&nbsp;",
            "JPAには複数のクエリ実装方法が存在するが、原則として以下の方法の利用は禁止する。",
            { "explain" : [
                "・EntityManagerを直接操作してクエリ実行",
                "	エンティティのライフサイクル管理やトランザクション処理が煩雑になり、保守性も低下するため。",
            ]},
            { "explain" : [
                "・メソッド名によるクエリ自動生成",
                "	可読性が低く、条件違いによるメソッドが乱立すると、著しく保守性が低下するため。",
            ]},
        ]
      },
      {
        "title" : "CRUD操作（登録）",
        "data" : [
            "データへの登録操作はJpaRepositoryのsave()メソッドまたはsaveAll()メソッドを必ず利用する。",
            { "code" : [
                "testRepository.save(testEntity);			// 一件登録時",
                "testRepository.saveAll(testEntityList);		// 複数件登録時",
            ]},
        ]
      },
      {
        "title" : "CRUD操作（更新）",
        "data" : [
            "データへの更新操作はデータの更新範囲に応じて適切な方法を選定する。",
            "通常は、JpaRepositoryのsave()メソッドまたはsaveAll()メソッドを利用する。（INSERTとUPDATEは登録状況によりJPAが自動で選択する）",
            { "code" : [
                "testRepository.save(testEntity);			// 一件更新時",
                "testRepository.saveAll(testEntityList);		// 複数件更新時",
            ]},
            "&nbsp;",
            "ただし、特定のカラムのみを更新するケース（例えば、削除フラグやステータスコードのみ変更する場合など）は、",
            "更新内容の明示化及び意図しないカラム更新のリスク回避の観点から、@Queryアノテーションを使ったクエリ実装を推奨する。",
            { "code" : [
                "@Modifying",
                "@Query(&quot;update TestEntity set statusCode = :statusCode where dataId = :dataId;&quot;)",
                "public int updateTestStatusCode(@Param(&quot;statusCode&quot;) String statusCode, @Param(&quot;dataId&quot;) String dataId);",
            ]},
        ]
      },
      {
        "title" : "CRUD操作（削除）",
        "data" : [
            "通常は、データIDのリスト指定や、複合条件で柔軟な削除を行えるように@Queryでのクエリ実装を推奨する。",
            { "code" : [
                "@Modifying",
                "@Query(&quot;delete from TestEntity where dataId in :dataIdList;&quot;)",
                "public int deleteTest(@Param(&quot;dataIdList&quot;) List&lt;String&gt; dataIdList);",
            ]},
            "または、JpaRepositoryのdeleteById()メソッドまたはdeleteAll()メソッドも利用可。",
            { "code" : [
                "testRepository.deleteById(testId);			// 一件削除時",
                "testRepository.deleteAll(testEntityList);	// 複数件削除時",
                "testRepository.deleteAll();					// 全件削除時",
            ]},
            "ただし、上記メソッドは以下の問題により処理件数や実行回数によっては著しく性能に影響を及ぼす。",
            { "explain" : [
                "・delete文が1件ずつ発行される",
                "・delete毎に事前にselect文も発行される",
            ]},
            "そのため性能の影響が大きい場合には以下の方法も推奨する。",
            "バルク削除では事前のデータ取得が行われず、複数件の一括削除が行える。",
            { "code" : [
                "testRepository.deleteInBatch(testEntityList);	// 複数件バルク削除時",
                "testRepository.deleteAllInBatch();				// 全件バルク削除時",
            ]},
        ]
      },
      {
        "title" : "CRUD操作（取得）",
        "data" : [
            "通常は、JpaRepositoryのgetOne()メソッド、findById()メソッド、findAll()メソッドを用途に応じて適切に選定する。",
            "&nbsp;",
            "h|1件取得",
            "キーによる1件取得は、getOne()メソッドまたはfindById()メソッドを利用する。",
            { "code" : [
                "TestEntity testEntity = testRepository.getOne(testId);",
                "Optional&lt;TestEntity&gt; testEntity = testRepository.findById(testId);",
            ]},
            { "explain" : [
                "・getOne() ",
                "	遅延取得で、取得したオブジェクトのフィールドへ最初にアクセスした時にSQLが発行される。",
                "	対象のデータが存在しない場合、EntityNotFoundExceptionがスローされる。",
                "	（Spring Data JPA 2.5以降では非推奨となり、代替としてgetReferenceById()が推奨されるが、本システムで採用している2.3では未提供）",
            ]},
            { "explain" : [
                "・findById() ",
                "	即時取得で、メソッドの呼び出し時点でSQLが発行され、Optionalでラップされた結果が返される。",
                "	対象のデータが存在しない場合、空のOptionalが返るため、安全に利用できる。通常はこちらの使用が推奨される。",
            ]},
            "h|複数件取得",
            "複数件の取得は、基本的にはfindAll()メソッドの利用を原則とする。",
            { "code" : [
                "testRepository.findAll();					// テーブルの全件取得",
                "testRepository.findAll(spec);				// 指定した検索条件（where）で取得",
                "testRepository.findAll(pageable);			// 指定したページ（limit/offset）、ソート順(order by）で取得",
                "testRepository.findAll(spec, pageable);	// specとpageableの複合指定で取得",
            ]},
            { "explain" : [
                "・spec（Specification） ",
                "	可読性・保守性の観点から、Specificationを生成する際はSpecificationGeneratorを使用することを原則とする。",
                "	SpecificationGeneratorについては別項を参照とする。"
            ]},
            { "explain" : [
                "・pageable（Pageable） ",
                "	取得データをページごとに取得するためにPageableを利用する。",
                "	基本的には、Controllerメソッドの引数としてPageableオブジェクトを受け取り、それを利用する。",
                "	Pageableは page（0 origin：最初のページは0）とsize（1以上：1ページの取得件数）を基本とし、",
                "	任意でsort（対象Entityのフィールド名＋昇順/降順）を指定することが可能である。",
                "	&nbsp;",
                "	Controllerメソッドを介さない場合（例：バッチ処理で最初のｎ件を取得する場合など）は、",
                "	PageRequest.of(page, size, sort) を利用して、任意の件数、ソート順を指定することも可能となる。",
            ]},
            "h|特殊な条件での取得",
            "複数テーブルの結合した結果を取得する場合や、データベース固有の関数などを用いた場合など、",
            "JpaRepositoryの標準メソッドでは実装が困難となるユースケースは度々発生する。",
            "また、バッチ処理において大量データを効率的に処理するために、Streamを用いたフェッチ取得が必要とする場合も考えられる。",
            "これらのケースにおいては、@Queryを用いてクエリを実装することを許容する。",
            "ただし、メンテナンス性の著しい低下を防ぐため、安易な@Queryメソッドの乱立には注意する。",
        ]
      },
      {
        "title" : "Specificationの生成について",
        "data" : [
            "JpaSpecificationExecutorのfindAll(spec)メソッドに用いるSpecificationは、",
            "SpecificationのtoPredicate()メソッドで検索条件を生成する。",
            "しかし、個別にtoPredicate()を実装すると、同様のロジックが繰り返し記述されてコードが冗長となるだけでなく、",
            "実装ミスや保守性の低下を招く恐れがある。",
            "本システムにおいては、共通のユーティリティクラスとなるSpecificationGeneratorを用意することで、",
            "Specificationの生成を容易にし、可読性や保守性の向上を行っている。",
            "h|使用準備",
            "ジェネリクスとなっているSpecificationに対応した生成を行うため、SpecificationGeneratorもジェネリクスのかたちを取っている。",
            "SpecificationGeneratorはSpring Beanに登録されており、インスタンスの再利用が可能である。",
            "対象EntityごとにDIによって注入され、サービスクラスで利用可能となる。",
            { "code" : [
                "@Autowired",
                "private SpecificationGenerator&lt;TestEntity&gt; testSpecGenerator;",
            ]},
            "h|単一条件の生成",
            "fieldNameに指定したカラムと、valueの比較用メソッドで検索条件を生成する。",
            { "code" : [
                "testSpecGenerator.equals(&quot;fieldName&quot;, value);							// valueと一致。				型：任意",
                "testSpecGenerator.notEqual(&quot;fieldName&quot;, value);							// valueと不一致。				型：任意",
                "testSpecGenerator.contains(&quot;fieldName&quot;, value);							// valueが含まれる。			型：文字列",
                "testSpecGenerator.lessThan(&quot;fieldName&quot;, value);							// valueより小さい。			型：任意",
                "testSpecGenerator.lessThanOrEqual(&quot;fieldName&quot;, value);					// value以下。					型：任意",
                "testSpecGenerator.greaterThan(&quot;fieldName&quot;, value);						// valueより大きい。			型：任意",
                "testSpecGenerator.greaterThanOrEqual(&quot;fieldName&quot;, value);				// value以上。					型：任意",
                "testSpecGenerator.in(&quot;fieldName&quot;, value);									// valueのいずれかに一致。	型：コレクション",
                "testSpecGenerator.notIn(&quot;fieldName&quot;, value);								// valueのいずれにも不一致。	型：コレクション",
                "testSpecGenerator.searchDate(&quot;fieldName&quot;, value);						// valueの日付範囲に合致。	型：※後述",
            ]},
            { "explain" : [
                "searchDate(&quot;fieldName&quot;, value) の引数valueは、以下に対応している。",
                "h|LocalDate",
                "日付型カラムがvalueと同じ日付であるかを比較する。",
                "00:00:00～23:59:59の範囲指定が自動で適用されるため、DATETIME型など時刻を含むカラムでも正確な日付比較が可能である。",
                "h|WhereParamDate",
                "年・月・日の3つのフィールドを持つ検索用クラスである。",
                "部分指定が可能であり、例えば「2024年のみ」「2024年5月のみ」「2024年5月1日」など、指定された粒度で日付の検索を行う。",
                "年月日すべて設定された場合、LocalDateと同様の検索結果となる。",
                "h|WhereParamDates",
                "From～Toの範囲を指定する検索用クラスであり、それぞれWhereParamDateを内包する。",
                "日付範囲による柔軟な検索が可能であり、例えば「2023年～2025年」と指定した場合、",
                "2023/01/01 00:00:00～2025/12/31 23:59:59の範囲が自動で適用されて検索される。",
            ]},
            "h|複数条件の生成（ANDのみの検索）",
            "条件を設定したWhereParamクラスのコレクションをもとに、すべての条件をANDで連結した検索条件を生成する。",
            { "code" : [
                "Set&lt;WhereParam&gt; whereSet = new HashSet&lt;&gt;();",
                "whereSet.add(new WhereParam(&quot;fieldName1&quot;, value1, Operand.EQUALS));",
                "whereSet.add(new WhereParam(&quot;fieldName2&quot;, value2, Operand.NOT_EQUAL));",
                "testSpecGenerator.toSpecification(whereSet);",
            ]},
            { "explain" : [
                "WhereParam にはフィールド名、検索値、比較条件を設定する。",
                "比較条件は、単一条件の生成メソッドと対となっている。",
                "&nbsp;",
                "・ EQUALS",
                "・ NOT_EQUAL",
                "・ CONTAINS",
                "・ LESS_THAN",
                "・ LESS_THAN_OR_EQUAL",
                "・ GREATER_THAN",
                "・ GREATER_THAN_OR_EQUAL",
                "・ IN",
                "・ NOT_IN",
                "・ SEARCH_DATE",
            ]},
            "h|複数条件の生成（ORを含む検索）",
            "OR条件が含まれる条件は汎用的なメソッド化が困難であるため、個別にOR条件とするSpecification同士を連結する。",
            { "code" : [
                "Specification&lt;TestEntity&gt; spec1 = testSpecGenerator.equals(&quot;fieldName1&quot;, value);",
                "Specification&lt;TestEntity&gt; spec2 = testSpecGenerator.equals(&quot;fieldName2&quot;, value);",
                "Specification&lt;TestEntity&gt; orSpec = spec1.or(spec2);",
            ]},
            { "explain" : [
                "ANDとORを組み合わせる場合は、連結の順番に注意が必要となる。",
                "複雑な条件においては実際に生成されたSQL文をログ出力し、想定した通りのWHERE句が設定されているかを確認することが望ましい。",
                "また、複雑過ぎる条件で保守性が著しく劣化する場合には、@Queryを用いたクエリ実装も検討してよい。",
            ]},
        ]
      },
      {
        "title" : "データベース操作の性能改善",
        "data" : [
            "大量データを扱うデータベース操作においては、性能面での課題が発生しやすい。",
            "処理の遅延のみならず、状況によっては処理不能に陥る危険性もあるため、適切な改善策を講じることが望ましい。",
            "h|一度に大量のデータを検索する場合",
            { "explain" : [
                "findAll()メソッドで大量のデータを一括取得すると、大量のEntityインスタンスがヒープ領域を圧迫し、",
                "OutOfMemoryErrorによりシステムが機能不全に陥る可能性がある。",
                "バッチ処理のようにデータ量が膨大になりやすい処理において、この問題が発生しやすい。",
                "対策としては、主に以下の２つのアプローチが考えられる。",
            ]},
            { "explain" : [
                "h|・データ取得を複数回に分割する。",
                "　例えば、reflected=false のデータに対して処理を行い、処理後にreflectedをtrueに更新するバッチ処理を行う場合、",
                "　対象データがなくなるまで一定件数（以下の例では1万件）ごとに分割して処理を行うことで、メモリ使用量を抑制できる。",
            ]},
            { "code" : [
                "Specification&lt;TestEntity&gt; testSpec = testSpecGenerator.equals(&amp;reflected&amp;, false);",
                "while (true) {",
                "    List&lt;TestEntity&gt; testList = testRepository.findAll(spec, PageRequest.of(0, 10000))",
                "    if (testList.isEmpty()) {",
                "        break;",
                "    }",
                "    for (TestEntity test : testList) {",
                "        // バッチ処理",
                "        test.setReflected(true);",
                "        testRepository.save(test);",
                "    }",
                "}",
            ]},
            { "explain" : [
                "h|・Streamで取得する。",
                "　ただし、JpaSpecificationExecutorはStreamを直接返すメソッドを提供していない点に留意する必要がある。",
                "　そのため、Specificationによる動的条件検索との併用はできず、検索条件が限定される場合に限って利用すべきである。",
                "　動的検索条件の利用が必要な場合には、データ取得の分割で代替することが望ましい。",
                "　@Queryを用いた独自メソッドをRepositoryに定義し、戻り値としてStreamを指定することで実現可能となる。",
            ]},
            { "code" : [
                "@Query(&anp;select t from TestEntity t where t.reflected = false&anp;)",
                "Stream&lt;TestEntity&gt; findNotReflected();",
            ]},
            { "code" : [
                "for (TestEntity test : testRepository.findNotReflected()) {",
                "    // バッチ処理",
                "    test.setReflected(true);",
                "    testRepository.save(test);",
                "}",
            ]},
            /*--------------------------------------*/
            "h|一度に大量の更新を行う場合",
            { "explain" : [
                "大量データに対して標準の更新系メソッド（save/delete）を用いた処理を行う場合、以下のような問題が発生しやすい。",
                "①ループ内で都度save()やdelete()を行うことで、処理時間が無駄に増加する。",
                "②既存データの確認が不要な場合にも、必ずSELECTクエリが発行され、余計な負荷や遅延が発生する。",
                "③EntityManagerのキャッシュが肥大化し、OutOfMemoryErrorに至る可能性がある。",
                "④トランザクションが肥大化することでオーバーフローを起こし、更新に失敗する可能性がある。",
                "対策としては、主に以下のアプローチが考えられる。",
            ]},
            { "explain" : [
                "h|・更新系メソッドはなるべくまとめて実行する。",
                "　ループ内では更新データをコレクションに集めるに留め、ループ終了後にsaveAllによる一括登録・更新を行う。",
            ]},
            { "code" : [
                "List&lt;TestEntity&gt; updateList = new ArrayList&lt;&gt;();",
                "for (int i = 0; i < 10; i++) {",
                "    TestEntity test = new TestEntity();",
                "    // 更新データ設定処理",
                "    updateList.add(test);",
                "}",
                "testRepository.saveAll(updateList);",
            ]},
            { "explain" : [
                "　また、カウンタ等を用いて一定件数ごとに一括更新・コミットを行い、",
                "　EntityManagerやトランザクションの肥大化を防ぐことも有効である。",
            ]},
            { "code" : [
                "List&lt;TestEntity&gt; updateList = new ArrayList&lt;&gt;();",
                "TransactionStatus status = transactionManager.getTransaction(requiresNewDefinition);",
                "for (int i = 0; i < 10; i++) {",
                "    TestEntity test = new TestEntity();",
                "    // 更新データ設定処理",
                "    updateList.add(test);",
                "    ",
                "    if (updateList.size() == 3) {",
                "        testRepository.saveAll(updateList);",
                "        transactionManager.commit(status);",
                "        ",
                "        updateList.clear();",
                "        entityManager.clear();",
                "        status = transactionManager.getTransaction(requiresNewDefinition);",
                "    }",
                "}",
                "// 残りのデータを更新してコミット",
                "testRepository.saveAll(updateList);",
                "transactionManager.commit(status);",
            ]},
            { "explain" : [
                "　また、更新するカラムや条件が明確な場合においては、事前確認を省略できる@Queryによる更新メソッドの利用も効果的である。",
                "　更新方式については「CRUD操作（更新）」の項も参照されたい。",
            ]},
            { "explain" : [
                "h|・バルク削除を活用する。",
                "　不要となったデータを物理削除する場合、事前確認を省略できる@Queryによる削除メソッドや、",
                "　JPAのバルク削除メソッドを利用することで効率的な処理が可能となる。",
                "　削除方式については「CRUD操作（削除）」の項を参照されたい。",
            ]},
        ]
      }
    ]
  },
  /*#####################################################
   * 共通（バッチ処理編
   *#####################################################*/
  {
    category : "共通（バッチ処理編）",
    datalist : [
      {
        "title" : "Spring Batchの仕組み",
        "data" : [
            "Spring Batchは、バッチ処理を効率的に開発・管理するためのフレームワークである。",
            "特に、処理の順序制御や例外発生時のジョブ停止といった、実装上課題となりやすい制御構造を明確に記述できる点を特徴とする。",
            "本プロジェクトでは、以下の観点に対する処理制御を独自実装することは、保守性及び品質管理の面で非効率かつリスクが高いと判断し、",
            "バッチ処理の実装にSpring Batchを採用している。",
            { "explain" : [
                "・直列実行による順序処理の制御",
                "	複数の処理タスクを、あらかじめ定義した順序で直列に実行することが可能である。",
                "	これにより、「ファイルの取得」「ファイルの読み取り」「データの加工」「ファイルの削除」といった処理を性質ごとに分離し、",
                "	明確な処理フローとして構成できる。",
            ]},
            { "explain" : [
                "・タスク処理失敗によるジョブ実行の中断",
                "	各タスクにおいて例外が発生した場合、その時点でジョブの実行を中断する構成が可能である。",
                "	中断処理を個別に実装する必要がないため、エラーハンドリングにかかる実装負担を軽減できる。",
            ]},
            "このように、Spring Batchは本来実装すべき業務ロジックの記述に集中できるように、バッチの基本的な制御を担う仕組みを提供している。",
        ]
      },
      {
        "title" : "Spring Batchの構成",
        "data" : [
            "本プロジェクトでは、より柔軟な処理設計を目的として、Spring Batchの動作単位としてタスクレットモデルを採用している。",
            "タスクレットモデルは、業務ロジックを処理単位で細かく制御したいケースに適している。",
            "ファイル操作やAPI連携など、ステートレスな処理に向いており、本プロジェクトの要件にも合致している。",
            "また、タスクレットモデルとチャンクモデルを混在させることは技術的には可能であるが、",
            "処理フローの可読性やエラーハンドリングの一貫性を重視し、本プロジェクトではチャンクモデルとの混在を禁止としている。",
            "&nbsp;",
            "タスクレットモデルの主要な構成要素として以下の3つが中核を成す。",
            { "explain" : [
                "・Job	：	ジョブ全体のフローを定義する。",
                "・Step	：	ジョブ内の処理単位を構成する。",
                "・Tasklet	：	業務ロジックを実装する。",
            ]},
            "以下に、基本的なバッチ構成の例を示す。",
            "h|Taskletの定義",
            "タスクレットはTaskletインターフェースを実装し、任意の処理をexecuteメソッド内に記述する。",
            "※尚、各システムで事前・事後処理やエラーハンドリングの共通化のため、Taskletインターフェースを実装した基底クラスを用意している場合もある。",
            "　本項ではあくまでSpring Batchの基本知識を目的としており、基底クラスを継承する実装については対象外とする。",
            { "code" : [
                "@Component",
                "public class HelloTasklet implements Tasklet {",
                "&nbsp;",
                "    @Override",
                "    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {",
                "        // 業務処理",
                "        return RepeatStatus.FINISHED; // 正常終了時にFINISHEDを返す",
                "    }",
                "}&nbsp;",
            ]},
            "h|StepとJobの定義",
            "StepはTaskletを組み込んで構成され、Jobは複数Stepの流れを制御する。",
            "以下は、Taskletを1つだけ持つ単純なJobの定義例である。",
            { "code" : [
                "@Configuration",
                "@EnableBatchProcessing",
                "public class BatchConfig {",
                "&nbsp;",
                "    @Autowired",
                "    private JobBuilderFactory jobBuilderFactory;",
                "    @Autowired",
                "    private StepBuilderFactory stepBuilderFactory;",
                "&nbsp;",
                "    @Bean",
                "    public Job helloJob(Step helloStep) {",
                "        return jobBuilderFactory.get(&quot;helloJob&quot;)",
                "                .incrementer(new RunIdIncrementer())",
                "                .start(helloStep())",
                "                .build();",
                "    }",
                "&nbsp;",
                "    @Bean",
                "    public Step helloStep(HelloTasklet helloTasklet) {",
                "        return stepBuilderFactory.get(&quot;helloStep&quot;).tasklet(helloTasklet).build();",
                "    }",
                "}&nbsp;",
            ]},
            "複数Stepの構成の場合、実行したい順序に従ってnext()を使用して接続する。",
            { "code" : [
                "    @Bean",
                "    public Job helloJob(Step helloStep) {",
                "        return jobBuilderFactory.get(&quot;helloJob&quot;)",
                "                .incrementer(new RunIdIncrementer())",
                "                .start(helloStep())",
                "                .next(nextStep1())",
                "                .next(nextStep2())",
                "                .build();",
                "    }",
            ]},
        ]
      },
      {
        "title" : "Spring Batchのジョブ実行方法",
        "data" : [
            "Spring Batchにおけるジョブの実行は、JobLauncherを用いて定義済みのJobを実行する形が基本である。",
            "必要に応じてJobParametersを渡すことで、ジョブの実行条件の指定や、同一ジョブの複数回実行に対応可能となる。",
            "本プロジェクトでは、ジョブは日次や毎時など、同一条件で繰り返し実行されることを前提としている。",
            "そのため、runTimeパラメータとしてタイムスタンプを指定することで、繰り返し実行を可能としている。",
            "以下に、JobLauncherを用いたジョブ実行の基本的な実装例を示す。",
            { "code" : [
                "@Autowired",
                "private JobLauncher jobLauncher;",
                "&nbsp;",
                "@Autowired",
                "private Job sampleJob;",
                "&nbsp;",
                "public void sampleJob() {",
                "&nbsp;",
                "    JobParameters params = new JobParametersBuilder()",
                "            .addLong(&quot;runTime&quot;, Instant.now().getEpochSecond())",
                "            .toJobParameters();",
                "&nbsp;",
                "    JobExecution execution = jobLauncher.run(sampleJob, params);",
                "}&nbsp;",
            ]},
        ]
      }
    ]
  },
  /*#####################################################
   * CMTS運用管理システム
   *#####################################################*/
  {
    category : "CMTS運用管理システム",
    datalist : [
      {
        "title" : "カレンダー表示方式",
        "data" : [
            "作業枠のカレンダーについては、JavaScriptのカレンダーライブラリである「FullCalendar」の表示をカスタマイズして利用している。",
            "FullCalendarはWebアプリケーションに動的なカレンダーを作成するライブラリであり、",
            "月・週・日での表示切り替えや、外部データソースからイベントを読み込む機能を持っている。",
            "h|使い方",
            "基本的なカレンダーのカスタマイズは calendar.js 及び calendar.css に共通処理として実装しているものを読み込む。",
            "尚、calendar.jsは共通処理であるため、非汎用的な処理の追加はなるべく避け、どうしても必要な場合には他の影響を十分に留意して行うこと。",
            { "code" : [
                "&lt;link href=&quot;../../../static/css/common/calendar.css&quot; th:href=&quot;@{/css/common/calendar.css}&quot; rel=&quot;stylesheet&quot;&gt;",
                "&lt;script src=&quot;../../../static/js/common/calendar.js&quot; th:src=&quot;@{/js/common/calendar.js}&quot;&gt;&lt;/script&gt;",
            ]},
            "対象HTMLのbody内にカレンダーの出力要素を追加する。",
            "この要素内にカレンダーが表示されるため、表示位置や全体の大きさは画面ごとに適宜調整する。",
            { "code" : [
                "&lt;div class=&quot;calendar&quot; id=&quot;calendar&quot;&gt;",
            ]},
            "JavaScriptにて、calendar.jsに定義されたカレンダー作成ファンクションを呼び出すことで、カレンダーの表示が行える。",
            "h|カレンダー作成ファンクション",
            "表示仕様の異なるファンクションを複数用意しているため、用途に応じて適切に選択する。",
            { "reference" : [
                "createCalendarTime(eventLoad, dateClick, eventClick, initialDate)",
            ]},
            { "explain" : [
                "「日（時間表示）」「週（時間表示）」「月（日表示）」を有効化する。",
            ]},
            "r|createCalendarDayCheck(eventLoad, dateClick, eventClick, initialDate, selectedDateList)",
            { "explain" : [
                "「週（日表示）」「月（日表示）」を有効化する。日付選択用のチェックボックスあり。",
                "selectedDateList に含まれる日付は、チェックボックスを選択済みとして表示される。",
            ]},
            "r|createCalendarDay(eventLoad, dateClick, eventClick, initialDate)",
            { "explain" : [
                "「週（日表示）」「月（日表示）」を有効化する。日付選択用のチェックボックスなし。",
            ]},
            "r|createCalendarViewOnly(eventLoad, initialDate)",
            { "explain" : [
                "「月（日表示）」を有効化する。他の表示範囲への切り替え不可。",
            ]},
            "各ファンクションに共通した引数は以下の通り。",
            { "explain" : [
                "・eventLoad	：	イベントの読込みファンクションを指定する。",
                "				REST APIにより、JSON形式のイベントデータとして作業枠や作業抑止を取得する。",
            ]},
            { "explain" : [
                "・dateClick	：	日付クリック時のアクションとして動作するファンクションを指定する。",
                "				日付クリック時のアクションが不要な場合は<code>null</code>を指定する",
            ]},
            { "explain" : [
                "・eventClick	：	イベントクリック時のアクションとして動作するファンクションを指定する。",
                "				イベントクリック時のアクションが不要な場合は<code>null</code>を指定する",
            ]},
            { "explain" : [
                "・initialDate	：	カレンダー表示の初期日付を指定する。月や週表示の場合、対象日付が含まれる月や週が表示される。",
                "				指定がない場合、デフォルトで現在日付となる。",
            ]},
            "h|任意のタイミングでカレンダーの更新",
            "カレンダー作成のファンクションは戻り値としてFullCalendarのカレンダーオブジェクトを返す。",
            "このカレンダーオブジェクトのrefetchEvents()ファンクションを実行することで、",
            "任意のタイミングでイベントの再取得及びカレンダーの再レンダリングを行うことが可能である。",
            "例えば、検索ボタンを押下時にカレンダーを更新する場合には、以下のように記述する。",
            { "code" : [
                "const calendarData = createCalendarTime(eventLoad, dateClick, eventClick, initialDate);",
                "$('#buttonSearch').click(function() {",
                "    calendarData.refetchEvents();",
                "});",
            ]},
            "refetchEvents()を実行すると、カレンダー作成ファンクションに指定したeventLoadファンクションが呼び出される。",
            "この時、eventLoad内部で取り扱うイベント取得条件の変更が必要である場合は、",
            "refetchEvents()ファンクションを呼び出す前にフォームデータの読み取りなどの事前処理を行うことが推奨される。",
            "eventLoad内部でフォームデータの読み取りを行うことも可能だが、その場合は表示月の切り替え時にも常に条件が更新される点に留意が必要である。",
        ]
      },
      {
        "title" : "エリア制御について※未作成",
        "data" : [
            "ｘｘｘｘｘｘｘ",
        ]
      },
      {
        "title" : "ｘｘｘｘ",
        "data" : [
            "ｘｘｘｘｘｘｘ",
        ]
      }
    ]
  }
]