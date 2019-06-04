import * as React from "react";
import * as PropTypes from "prop-types";

import { getClassName } from "utils//ClassName";
import { connect } from "alt-react";
import { ModalStore } from "stores/ModalStore";
import IntlStore from "stores/IntlStore";
import { ModalActions } from "actions/ModalActions";
import Translate from "react-translate-component";
import Icon from "../Icon/Icon";
import counterpart from "counterpart";
import utils from "lib/common/utils";
import { BaseModal } from "./../Modal/BaseModalNew";
import * as moment from "moment";

const style = {
  position: "fixed",
  left: 0,
  top: 0
};

type props = { locale; modalId; open?; className?; accountName };

const ContentZh = (
  <div className="title-holder">
    <h3 className="center title">服务条款与条件</h3>
    <p>本条款由您与数字资产交易平台运营商Cybex共同缔结，并具有合同效力。</p>

    <p>
      CYBEX SYSTEM PTE.
      LTD.，一家根据新加坡共和国法律正式建立的公司，运营去中心化的数字资产交易平台，允许注册用户（以下简称“用户”）认购Cybex和/或发行方（以下简称“发行方”）提供的数字货币，硬币和通证（以下简称“数字资产”），并自愿参与早鸟通证发行计划（以下简称“ETO”）（以下简称“服务”）。我们包括我们的合作伙伴，官员，员工，董事或代理人，特制定本条款，包括我们的免责声明（以下简称“免责声明”），以充分披露使用服务过程中的风险，并明确说明我们的责任限制。
    </p>

    <p>
      在本条款中，“我们”，“我们的”和“Cybex”指代CYBEX SYSTEM PTE.
      LTD.，及其所有者，董事，投资者，员工，相关法人团体或其他相关方。
      “Cybex”也可以根据上下文要求提及Cybex提供的服务、产品、网站、内容或其他材料。
    </p>

    <p>
      本网站(www.cybex.io)由Cybex拥有并运营。通过访问我们的网站和平台，进一步通过注册使用我们的服务，您同意并接受本平台发布的全部条款以及免责声明。你应该仔细阅读我们的免责声明和其他条款和条件，如果你不同意任何条款，应立即停止使用我们的服务。 
    </p>

    <p>
      我们郑重提醒：任何访问我们平台或使用我们服务的组织或个人都被视为已完全理解，承认并接受本条款的全部内容。
      Cybex保留修改和解释本条款包括但不限于我们的免责声明的权利。
    </p>
    <h3 className="center title-sub">内容及签署</h3>
    <ol>
      <li>
        1.
        本条款包括所有Cybex已经发布的或将来可能发布的各类规则（下称“有关规则”）。所有有关规则为本条款不可分割的 组成部分，与本条款具有同等法律效力。除另行明确声明外，任何平台、Cybex及其关联方提供本条款项下的服务均受本条款约束。
      </li>
      <li>
        2.
        您应当在使用服务之前认真阅读全部条款内容。如您对条款有任何疑问的，应向我们咨询（邮箱地址：service@cybex.io）。但无论您事实上是否在使用服务之前认真阅读了条款内容，只要您使用服务，则本条款即对您产生约束，届时您不应以未阅读本条款的内容或者未获得我们对您问询的解答等理由，主张本条款无效或要求撤销本条款。
      </li>
      <li>
        3.
        Cybex有权根据需要不时地制订、修改本条款及/或任何有关规则，并以平台公示的方式进行公告，不再单独通知您。变更后的协议和有关规则一经在平台公布后，立即自动生效。如您不同意相关变更，应当立即停止使用服务。您继续使用服务的，即表示您接受经修订的条款和有关规则。如果您不同意修订后的条款，则不应访问平台或我们的服务，您应通过以下电子邮件地址与我们联系以关闭您的帐户：service@cybex.io。
        请不时查看此页面，以了解我们所做的任何更改，因为它们对您具有约束力。
      </li>
      <li>
        4. 对于某些广告、促销或竞赛，可能会适用其他的条款和条件。
        如果您想参加此类广告、促销或竞赛，则需要同意适用于该广告、促销或竞赛的相关条款和条件。
        如果该等条款和条件与本条款之间存在任何不一致，则以该等条款和条件为准。
      </li>
      <li>
        5. 您可能会下载其他和/或可选软件，以便我们向您提供一些服务。
        其他的条款和条件可能适用于这些软件。
        如果您下载这些软件，则需要同意适用于它们的相关条款和条件。
        如果这些条款和条件与这些条款之间存在任何不一致，则以这些条款和条件为准。
      </li>
    </ol>
    <ol>
      <h3 className="center title-sub">注册与账户</h3>
      <li>
        1. 用户资格 <br />
        您确认，在以Cybex允许的方式实际使用服务时，您应当是：
        <br />
        (a) 自然人（年满18岁）、法人或其他组织；
        <br />
        (b) 具备完全的法律权利和能力与我们签订具有法律约束力的协议；
        <br />
        (c) 同意并保证按照本条款和条件使用服务；和
        <br />
        (d)（如有）符合适用法律和法规的合格投资者。
        <br />
        若您不具备前述资格要求，则您应承担因此而导致的一切后果，且Cybex有权注销或永久冻结您的账户，并向您索偿。
      </li>
      <li>
        2. 注册及账户
        <br />
        (a)
        在您第一次使用我们平台，阅读并同意本条款后，或您以Cybex允许的方式实际使用服务时，您即受本条款及所有有关规则的约束。
        <br />
        (b)
        除非有法律规定或司法裁定，或者符合Cybex公布的条件，否则您的登录名和密码不得以任何方式转让、赠与或继承，并且转让、赠与或继承需提供我们要求的合格的文件材料并根据我们制定的操作流程办理。
      </li>
      <li>
        3. 用户信息
        <br />
        (a)
        在使用服务时，您应不时更新您的用户资料，以使之真实、及时、完整和准确。如有合理理由怀疑您提供的资料错误、不实、过时或不完整的，Cybex有权向您发出询问及/或要求改正的通知，并有权直接做出删除相应资料的处理，直至中止、终止对您提供部分或全部服务。Cybex对此不承担任何责任，您将承担因此产生的任何直接或间接损失及不利后果。
        <br />
        (b)
        您应当准确填写并及时更新您提供的电子邮件地址、联系电话、联系地址等联系方式，以便Cybex在需要时与您进行有效联系，因通过这些联系方式无法与您取得联系，导致您在使用服务过程中产生任何损失或增加费用的，应由您完全独自承担。您了解并同意，您有义务保持你提供的联系方式的有效性，如有变更或需要更新的，您应按Cybex的要求进行操作。
      </li>
      <li>
        4. 账户安全
        <br />
        您须自行负责对您的登录名和密码保密，且须对您在该登录名和密码下发生的所有活动（包括但不限于信息披露、发布信息或使用服务等）承担责任。您同意：
        <br />
        (a)
        如发现任何人未经授权使用您的登录名和密码，或发生违反您与Cybex的任何保密规定的任何其他情况，您会立即通知我们，并授权Cybex将该信息同步到平台；及
        <br />
        (b)
        确保您在每个上网时段结束时，以正确步骤离开平台/服务。我们不能也不会对因您未能遵守本款规定而发生的任何损失负责。
      </li>
    </ol>
    <h3 className="center title-sub">服务使用规范</h3>
    <ol>
      <li>
        1. 在使用平台服务过程中，您承诺遵守以下约定：
        <br />
        (a)在使用服务过程中实施的所有行为均遵守所有适用的国家的相关法律、法规的规定和要求，不违背社会公共利益或公共道德，不损害他人的合法权益，不违反本条款及有关规则。您如果违反前述承诺，产生任何法律后果的，您应以自己的名义独立承担所有的法律责任，并确保Cybex及其关联方免于因此产生任何损失。
        <br />
        (b)在与其他会员交易过程中，遵守诚实信用原则，不采取不正当竞争行为，不扰乱交易的正常秩序，不从事与交易无关的行为。
        <br />
        (c)不对平台上的任何数据作商业性利用，包括但不限于在未经Cybex事先书面同意的情况下，以复制、传播等任何方式使用平台上展示的资料。
        <br />
        (d)不使用任何装置、软件或日常程序干扰或试图干扰平台的正常运作或正在平台上进行的任何交易或活动。您不得采取任何将导致庞大数据负载加诸平台网络系统的行动。
      </li>
      <li>
        2. 您了解并同意：
        <br />
        (a)Cybex有权对您是否违反上述承诺做出单方认定，并根据单方认定结果的适用有关规则予以处理或终止向您提供服务，且无须征得您的同意或提前通知予您。
        <br />
        (b)经任何国家的行政或司法机关生效的法律文书确认您存在违法或侵权行为的，或者Cybex根据自身的判断，认为您的行为涉嫌违反本条款和/或有关规则的规定或涉嫌违反任何适用法律法规的规定的，则Cybex有权在平台上公示您的该等涉嫌违法或违约行为及Cybex已对您采取的措施。
        <br />
        (c)对于您在平台上实施的行为，包括您未在平台上实施但已经对平台及其他用户产生影响的行为，Cybex有权单方认定您行为的性质及是否构成对本条款和/或有关规则的违反，并据此作出相应处罚。您应自行保存与您行为有关的全部证据，并应对无法提供充要证据而承担的不利后果。
        <br />
        (d)对于您涉嫌违反承诺的行为对任何第三方造成损害的，您均应当以自己的名义独立承担所有的法律责任，并应确保Cybex及其关联方免于因此产生损失或增加费用。
        <br />
        (e)如您涉嫌违反有关法律、本条款或任何有关规则之规定，使Cybex遭受任何损失，或受到任何第三方的索赔，或受到任何政府部门的处罚，您应当赔偿Cybex因此遭受的损失及（或）发生的费用，包括合理的律师费用。
      </li>
    </ol>
    <h3 className="center title-sub">特别授权</h3>
    <p>您完全理解并不可撤销地授予Cybex及其关联方下列权利：</p>
    <ol>
      <li>
        1.
        一旦您向Cybex和/或关联方作出任何形式的承诺，且相关公司已确认您违反了该承诺，则Cybex有权立即按您的承诺或条款约定的方式对您的账户采取限制措施，包括中止或终止向您提供服务，并公示相关公司确认的您的违约情况。您了解并同意，Cybex无须就相关确认与您核对事实或另行征得您的同意，且Cybex无须就此限制措施或公示行为向您承担任何的责任。
      </li>
      <li>
        2.
        一旦您违反本条款或任何有关规则，或与Cybex和/或关联方签订的其他协议的约定，Cybex有权以任何方式通知关联方，要求其对您的权益采取限制措施，包括但不限于要求有关公司中止、终止对您提供部分或全部服务、在其经营或实际控制的任何网站公示您的违约情况等。
      </li>
      <li>
        3.
        对于您提供的数据信息，您授予Cybex及其关联方独家的、全球通用的、永久的、免费的许可使用权利(并有权在多个层面对该权利进行再授权)。 此外，Cybex及其关联方有权(全部或部份地)使用、复制、修订、改写、发布、翻译、分发、执行和展示您的全部资料数据（包括但不限于注册资料、交易行为数据及全部展示于平台的各类信息）或制作其衍生作品，并以现在已知或日后开发的任何形式、媒体或技术，将上述信息纳入其它作品内。
      </li>
    </ol>
    <h3 className="center title-sub">陈述及保证</h3>
    <ol>
      <li>
        1. 用户特此同意并承诺：
        <br />
        (a)您只会按照本条款规定并以订购数字资产为目的，操作一个帐户和使用本平台；
        <br />
        (d)您已获正式授权，并有能力在平台上进行所有交易;
        <br />
        (c)您负责持有或交易的数字资产所产生的任何纳税义务，并对我们进行补偿，如我们根据义务代表您对您帐户中或您持有的任何数字资产进行缴税。您授权我们根据任何适用的税法要求预扣任何应纳税额;
        <br />
        (d)您将就您在平台上上传、发布、传播和发送的任何内容完全负责，包括任何文本、文件、图像、照片、视频、音频、音乐和任何其他信息(包括通过电子邮件进行的通信)。
        <br />
        (e)您将遵守所有您试图进行账户操作所在地的任何司法管辖区所适用的法律;
        <br />
        (f)所有存入您帐户的数字资产或金额，均来源合法，你拥有或以其他方式拥有完全法律权利进行处置；和
        <br />
        (g)您承认您明白并接受通过平台参与的数字资产交易所涉及的风险;
        <br />
        (h)参与ETO是一项高风险活动，意味着你可能会失去所有投资金钱或数字资产;
        <br />
        (i)你持有的数字资产可能没有任何流动性、买家或未来买家;
        <br />
        (j)由于法律或法规的改变，数字资产可能被禁止兑换其他数字资产或法定货币;
        <br />
        (k)我们不会就平台上列出的任何数字资产的未来表现、未来盈利能力或回报作出任何陈述或保证;
      </li>
      <li>
        2. 发行人特此同意并承诺如下：
        <br />
        (a)您对使用本平台不侵犯任何第三方的权利或违反任何适用法律;
        <br />
        (d)您已获正式授权，并有能力在平台上进行所有交易;
        <br />
        (c)您对您在平台上进行的任何商业活动或促销活动自行负责;
        <br />
        (d)您对您在平台上提供的关于数字资产的任何文件或白皮书所含信息的准确性负责;
        <br />
        (e)您对您与用户之间的任何协议、条款、保证和声明负责;
        <br />
        (f)如果我们因用户就您的数字资产向我们提出索赔而为自己辩护，您将全额赔偿我们的所有费用，包括产生的法律费用;
        和
        <br />
        (g)您不会使用平台进行任何形式的非法活动，包括但不限于非法融资、洗钱或恐怖主义融资。
      </li>
      <li>
        3. Cybex同意：
        <br />
        (a)在法律允许的最大范围内，我们不对本平台或内容做出任何保证或陈述，包括但不限于陈述并保证其完整性、准确性或及时性，访问将不会中断或错误，无差错或免于病毒或本网站安全。
        <br />
        (d)我们保留在任何时候且无需通知您的情况下限制、暂停或终止您对平台或任何内容的访问，我们将不承担任何可能导致的损失、成本、损害或责任。
      </li>
    </ol>
    <h3 className="center title-sub"> 免责声明 </h3>
    <ol>
      <li>
        1. 独立性
        <br />
        Cybex，包括其合作伙伴，高级职员，员工，董事，代理人或任何其他相关方，将始终保持与任何发行人和用户的独立性，并且不与我们平台上线的任何项目相关联或对其表示认可或赞助。
        虽然Cybex可能会因提供服务而收取服务费，但通过我们平台发行或预购任何数字资产的行为均不得被解释为与我们建立任何形式的合伙，合资或任何其他类似关系。
      </li>
      <li>
        2. 无推荐和建议
        <br />
        在发布有关发行人及其项目信息前，我们将会对发行人的基本信息及其项目进行一定程度的审查，但在任何情况下，Cybex都不应被视为提供任何投资、法律、税务、财务或其他方面的推荐和建议，或考虑任何个人情况。你关于参与ETO以及购买、出售或持有任何数字资产的决定所涉及的风险，应基于自己判断或合格金融专业人士的建议。
      </li>
      <li>
        3. 无盈利保证
        <br />
        Cybex不是经纪交易商或财务顾问，也不隶属于任何投资咨询公司。使用任何Cybex或平台提供的有关ETO及其他相关的数据或信息，不会也不能保证您将获利或不会产生损失。
        您必须依赖自己的判断或咨询专业人士以获取有关此类事项的建议。您必须根据您的财务状况和承担财务风险的能力，仔细考虑信息是否适合您。
      </li>
      <li>
        4. 项目信息
        <br />
        所有与发行人及其项目有关的信息、数据、白皮书和其他材料（“信息”）系由发行方自行提供且可能存在风险和瑕疵，发行方对其全部所作陈述和提供信息的准确性负全部责任。Cybex仅作为获取发行人和项目信息及开展交易的平台，无法控制项目的质量、安全或合法性，发行人信息的真实性或准确性，以及不同发行人履行其交易义务的能力。Cybex不做任何陈述并且不承担任何明示或暗示的保证，包括但不限于对任何项目的准确性、及时性、完整性、适销性或适用性，且不对任何因信息不准确或遗漏，或基于或依赖信息的任何决定、作为或不作为而引起的任何损失或损害承担责任（无论是侵权还是合同或其他方式）。
      </li>
      <li>
        5. 监管措施
        <br />
        根据您居住的国家，您可能无法使用平台的所有服务。您有义务遵守您所在的国家和/或您访问我们平台和服务的国家的规则和法律。此外，由于监管政策可能不时变化，任何司法管辖区现有的监管许可或包容可能只是暂时的。如果您在法律上不被允许或不符合这些规则和法律所要求的资格，您应该立即停止使用我们的平台和服务。
      </li>
      <li>
        6. 个人信息
        <br />
        虽然Cybex是一个去中心化的数字资产交易平台，但我们可能仍需要根据适用法律法规的相关要求进行“了解您的客户”调查（以下简称“KYC”）。我们可能会要求个人信息（如驾驶执照，身份证，政府签发的照片识别，水电费，银行账户信息或类似信息），以减少洗钱和恐怖主义融资事件。在使用服务时，您应根据我们的要求提供相关的个人信息，并不时更新您的个人信息，以确保其真实、更新、完整、准确。如果有合理理由怀疑您提供的信息是错误，不实，过时或不完整，Cybex向您发出询问及/或要求改正的通知，并有权直接做出删除相应资料的处理，直至中止、终止对您提供部分或全部服务。Cybex对此不承担任何责任，您将承担因此产生的任何直接或间接损失及不利后果。
      </li>
      <li>
        7. 有效性
        <br />
        鉴于Cybex是一个去中心化的交易平台，如果用户不通过我们要求和提供的官方渠道（ETO
        网页前端入口）参与众筹，例如通过API方式直接转账到众筹地址，这在技术层面上暂时无法预防。但是，我们作为平台运营方不承认通过不正当方式进行的众筹是有效的，也不退还任何通过非正式途径进行的众筹资金。无效的众筹包括但不限于:（a）非众筹币种的募资；（b）超过个人限额的募资；（c）非项目正常众筹周期内的筹资；（d）非白名单用户的筹款。
      </li>
      <li>
        8. 流动性
        <br />
        任何在我们的平台上线或交易的数字资产（以下简称“上线资产”）不是任何个人，实体，中央银行或国家，超国家或准国家组织发行的货币，也不具备任何硬资产或其他信贷支持。
        上线资产的价值在很大程度上取决于其项目的受欢迎程度。
        最糟糕的情况是上线资产甚至可能在长期内被边缘化，仅吸引极小部分的用户。
        上线资产的交易仅取决于相关市场参与者对其价值的共识。
        Cybex将不会（也没有义务或责任）稳定或以其他方式影响上线资产的市场价格，且不对任何上线资产价格作出保证。
      </li>
      <li>
        9. 波动性
        <br />
        参与、购买和销售数字资产通常不涉及与官方法定货币或市场中的商品或商品相同的重大风险。不同于大多数法定货币，这些数字资产基于技术和信任，没有中央银行或其他实体可以采取纠正措施来保护数字资产的价值或调整数字资产的供需。数字资产的价格可能会受到大幅波动，并可能变得毫无价值。Cybex将不会（也没有义务或责任）稳定或以其他方式影响数字资产的市场价格，且不对任何数字资产价格作出保证。您应仔细评估您的目标、财务状况、需求、经验和风险承受能力是否适合参与、购买或出售数字资产。
      </li>
    </ol>
    <h3 className="center title-sub">责任范围和责任限制 </h3>
    <ol>
      <li>
        1.
        Cybex负责按"现状"和"可得到"的状态向您提供服务。但Cybex对服务不作任何明示或暗示的保证，包括但不限于服务的适用性、无差错或疏漏、持续性、准确性、可靠性、适用于某一特定用途。同时，Cybex也不对服务所涉及的技术及信息的有效性、准确性、正确性、可靠性、质量、稳定、完整和及时性作出任何承诺和保证。
      </li>
      <li>
        2.
        在法律允许的最大范围内，在任何情况下，我们均不对任何直接和间接的损失，损害或费用承担责任，包括您可能因使用我们的服务或我们的平台和/或其中包含的信息或材料，或由于本平台无法访问和/或其中包含的某些信息或材料不正确，不完整或不及时而遭受的损失而无论其如何发生。
      </li>
      <li>
        3. 在不限制上述规定的前提下，我们不承担以下责任：
        <br />
        (a)无论是根据合同法，侵权法或其他，任何商业损失、收入损失、收入、利润、机会或预期收益、合同或业务关系损失、声誉或商誉损失以及任何其他间接、特殊或后果性损失。
        <br />
        (b)任何由于您使用我们平台，或您下载任何内容，或任何链接网站而引起的可能影响您的计算机设备，计算机程序，数据或其他专有材料的病毒、信息或数据损坏、病毒、信息或数据损坏或其他技术有害材料所导致的损失或损害。
      </li>
      <li>
        4. 即使损失是可预见的，或我们已明确告知潜在损失，责任限制依然适用。
      </li>
      <li>
        5.
        本条款中的任何内容均不排除或限制任何一方因其疏忽，违反法律规定的条件或任何其他法律规定不得限制或排除的责任而导致的欺诈，死亡或人身伤害责任。
      </li>
      <li>
        6.
        除上述规定外，我们对于任何用户或发行人使用本平台和/或服务而引起或与之相关事件的索赔的总赔偿责任，无论是合同或侵权行为（包括疏忽）还是其他方面，在任何情况下均不超过以下两者中较大者：
        <br />
        (a)索赔用户或发行人的账户上的总金额扣除任何适用的提取费用; 或
        <br />
        (b)作为索赔标的交易金额的100%减去该等交易任何可能到期和应付佣金；
        <br />
        且我们对每个用户或发行人的赔偿责任不超过5,000美元。
      </li>
    </ol>
    <h3 className="center title-sub">终止 </h3>
    <ol>
      <li>
        1.
        您同意，Cybex有权自行全权决定以任何理由不经事先通知的中止、终止向您提供部分或全部服务，暂时冻结或永久冻结（注销）您的账户在平台的权限，且无须为此向您或任何第三方承担任何责任。
      </li>
      <li>
        2.
        出现以下情况时，Cybex有权直接终止本协议，并有权永久冻结（注销）您的账户在平台的权限:
        <br />
        (a)您提供的电子邮箱不存在或无法接收电子邮件，且没有其他方式可以与您进行联系，或Cybex以其它联系方式通知您更改电子邮件信息，而您在我们通知后三个工作日内仍未更改为有效的电子邮箱的；
        <br />
        (b)您提供的个人信息中的主要内容不真实或不准确或不及时或不完整；
        <br />
        (c)本条款（含有关规则）变更时，您明示并通知公司不愿接受经修改的协议或有关规则的；及
        <br />
        (d)其它公司认为应当终止任何服务的情况。
      </li>
      <li>
        3.
        您的账户被终止或者账户在平台的权限被永久冻结（注销）后，Cybex没有义务为您保留或向您披露您账户中的任何信息，也没有义务向您或第三方转发任何您未曾阅读或发送过的信息。
      </li>
      <li>
        4. 您同意，您与Cybex的合同关系终止后，Cybex仍享有下列权利：
        <br />
        (a)继续保存您的个人信息及您使用服务期间的所有交易信息；
        <br />
        (b)您在使用服务期间存在违法行为或违反本条款和/或有关规则的行为的，Cybex仍可依据本条款向您主张权利。
      </li>
    </ol>
    <h3 className="center title-sub">隐私权政策 </h3>
    <p>
      Cybex将在平台上公布并不时修订隐私权政策，隐私权政策构成本条款的有效组成部分。
    </p>
    <h3 className="center title-sub">法律适用、争议处理 </h3>
    <p>
      本条款之效力、解释、变更、执行与争议解决均适用新加坡法律，任何新加坡的法律冲突规则或原则不适用于本条款。凡因本条款引起的或与之相关的争议、纠纷或索赔、包括违约、协议的效力和终止，均应提交新加坡国际仲裁中心（以下简称“SIAC”），按仲裁通知时有效的SIAC规则解决。
    </p>
  </div>
);

const ContentEn = (
  <div className="title-holder">
    <h3 className="center title">Terms and Conditions</h3>
    <p>
      These Terms and Conditions are concluded between and by you and Cybex, the
      operator of a digital assets trading platform (hereinafter be referred to
      as the “Platform”), and shall be an effective agreement. 
    </p>
    <p>
      CYBEX SYSTEM PTE. LTD., a corporation duly is establishing under the laws
      of the Republic of Singapore, operates a decentralised platform allowing
      registered Users (hereinafter be referred to as “Users”) to subscribe for
      digital currencies, coins and tokens (hereinafter be referred to as
      “Digital Assets”) from Cybex and/or Issuers (hereinafter be referred to as
      “Issuers”) and to participate voluntarily in Earlybirds Token offering
      (hereinafter be referred to as “ETO”) (hereinafter be referred to as
      “Service”). We, including our partners, officers, employees, directors, or
      agents, hereby issue these Terms and Conditions, which include our
      disclaimer (hereinafter be referred to as “Disclaimer”) to fully disclose
      the risks in the process of your using Service and to state expressly our
      limitation of liability.
    </p>
    <p>
      In these Terms, “us”, “we”, “our” and “Cybex” means CYBEX SYSTEM PTE.
      LTD., its owners, directors, investors, employees, related bodies
      corporate or other related parties. “Cybex” may also refer to the
      Services, products, website, content or other materials provided by Cybex
      as the context requires.
    </p>
    <p>
      The website (www.cybex.io) is owned and operated by Cybex. By accessing to
      our website and platform, and further by registering to use our Service,
      you agree to accept any and all terms and conditions as well as Disclaimer
      published by the Platform. You should read our Disclaimer and other terms
      and conditions carefully and immediately cease using our Service if you do
      not agree with any terms.
    </p>
    <p>
      We solemnly remind that: any organization or individual who access to our
      platform or Service is deemed to have fully understood, acknowledged and
      accepted the entire contents of these terms and conditions. Cybex reserves
      the right to amend and interpret these terms and conditions including
      without limitation our Disclaimer.
    </p>

    <h3 className="center title-sub">Content and Execution</h3>
    <ol>
      <li>
        1. These terms and conditions includes all rules already or will be
        published by Cybex (hereinafter referred to as the “Relevant Rules”).
        All Relevant Rules are an integral part of these terms and conditions
        and have the same legal effect as these terms and conditions. Except
        otherwise expressly stated, any Services hereunder provided by
        the Platform, Cybex or its affiliated parties will be bound by these
        terms and conditions.
      </li>
      <li>
        2. You must carefully read the full content of these terms and
        conditions before using the Services. If you have any questions
        regarding these terms and conditions, you should consult us (E-mail:
        service@cybex.io). However, regardless of whether you have actually read
        these terms and conditions carefully before using the Services, as long
        as you use the Services, you will be deemed to be bound by these terms
        and conditions. You may not use the reasons of not having read these
        terms and conditions or not having received answers to inquiries from us
        as a basis to invalidate or cancel these terms and conditions. 
      </li>
      <li>
        3. Cybex has the right to amend these terms and conditions and/or any
        Relevant Rules at any time according to its needs. The amended and
        restated terms will be posted at the Platform, and you will not be
        notified individually. The amended and restated terms and conditions
        and/or Relevant Rules will automatically take effect once it is posted
        at the Platform. If you do not agree with the changes, you must cease
        use of the Services immediately. Your continued use of the Services
        shall be deemed as your acceptance of the amended terms and conditions
        and/or Relevant Rules. In the event that you do not agree to the revised
        terms, you must not access the Platform or our Service and you should
        contact us at the following email address to close your
        Account: service@cybex.iowoaknwoakn. Please check this page from time to
        time to take notice of any changes we made, as they are binding on you.
      </li>
      <li>
        4. For certain campaigns, promotions or contests, additional terms and
        conditions may apply. If you want to participate in such a campaign,
        promotion or contest, you need to agree to the relevant terms and
        conditions applicable to that campaign, promotion or contest. In case of
        any inconsistency between such terms and conditions and these Terms,
        those terms and conditions will prevail.
      </li>
      <li>
        5. There may be additional and/or optional software which you may
        download on which we may provide some of our Services to you. Additional
        terms and conditions may apply to the software. If you download these
        software, you need to agree to the relevant terms and conditions
        applicable to them. In case of any inconsistency between such terms and
        conditions and these Terms, those terms and conditions will prevail.
      </li>
    </ol>
    <h3 className="center title-sub">Registration and Accounts</h3>
    <ol>
      <li>
        1. Eligibility of Users <br />
        By using the Services in a manner allowed by Cybex, you acknowledge that
        you must be:
        <br />
        (a) A natural person of at least 18 years of age, a legal person, or
        other organization;
        <br />
        (b) Has full legal right and ability to enter into a legally binding
        agreement with us;
        <br />
        (c) Has full legal right and ability to enter into a legally binding
        agreement with us;
        <br />
        (d) Accredited investor in accordance with applicable laws and
        regulations, if any.
        <br />
        If you do not meet these eligibility requirements, you must bear all
        resulting consequences, and Cybex has the right to cancel or permanently
        freeze your account, and make claims against you. 
      </li>
      <li>
        2. Registrtion and Account 
        <br />
        (a) From your first use of our Platform and have read and agreed to the
        provisions of these terms and conditions, or when you use the Services
        via other methods allowed by Cybex, you will be bound to these terms and
        conditions and all Relevant Rules. 
        <br />
        (b) Unless there are legal provisions or judicial decisions, or in
        compliance with the Cybex’s conditions, otherwise your login name and
        password may not be transferred, gifted or inherited by any means.
        Transfers, gifts or inheritances may only be processed after providing
        necessary documents as requested by us, and will be handled in
        accordance with our operating procedures.
      </li>
      <li>
        3. User Information
        <br />
        (a) When using the Services, you should update your user information
        from time to time in order to ensure it remains true, updated, complete
        and accurate. If there are reasonable grounds to doubt that the
        information you provided is incorrect, false, outdated or incomplete,
        Cybex has the right to make an inquiry and/or request changes, and also
        has the right to directly delete any corresponding information, until
        the suspension or termination of the Services (in full or in part)
        provided to you. Cybex does not assume any responsibility in this
        respect, and you are liable for any resulting direct or indirect losses
        and adverse consequences. 
        <br />
        (b) You must accurately fill in and update the contact information you
        provide to Cybex such as email address, contact number, address etc., in
        order for Cybex to effectively contact you if necessary. If you cannot
        be contacted by such contact information, you are solely responsible for
        any resulting losses or costs incurred while using the Services. You
        understand and agree that you must maintain the validity of the contact
        information you provide, any changes or updates must be carried out in
        accordance with Cybex’s requirements. 
      </li>
      <li>
        4. Account Safety
        <br />
        You are solely responsible for the confidentiality of your login name
        and password, and all activities that occur under your login name and
        password (including, but not limited to, disclosure or release of
        information, or using services online etc.) You agree:
        <br />
        (a) To immediately inform us and authorize Cybex provide such
        information to the Platform in the event that you discover any
        unauthorized usage of your login name and password or any other
        situation that violates the confidentiality provisions between you and
        Cybex; and 
        <br />
        (b) To correctly exit / log-out of the Platform / Services at the end of
        each online session. We cannot and will not take responsibility for any
        losses or damages that are incurred as a result of your failure to
        comply with this provision.
      </li>
    </ol>
    <h3 className="center title-sub">Guidelines on the Use of Services</h3>
    <ol>
      <li>
        1. During your use of the Services of the Platform, you undertake to
        comply with the following provisions: 
        <br />
        (a)All acts conducting during use of the Services must comply with all
        applicable national laws, regulations, rules and requirements, must not
        violate social public interest or public morals, must not adversely
        affect the legitimate rights and interests of others, and must not
        violate these terms and conditions as well as the Relevant Rules. If you
        violate any of the above undertakings, and the violation results in any
        legal consequences, you must individually bear all legal
        responsibilities, and ensure that Cybex and its affiliated parties are
        exempt from any resulting losses.  
        <br />
        (b)To act in good faith, not to undertake any behavior of unfair
        competition, not to disturb the normal order of transactions, and not to
        engage in actions unrelated to transactions.
        <br />
        (c)Not to commercially use any data of the Platform, including but not
        limited to, to not copy or disseminate etc. and use information
        displayed on the Platform without the prior written consent of Cybex. 
        <br />
        (d)Not to use any devices, software or routine procedures to interfere
        or attempt to interfere with the normal operation of the Platform, or
        any transaction or activity carried out on the Platform. You must not
        carry out any action that will cause a large data load to the network
        system of the Platform.  
      </li>
      <li>
        2. You understand and agree that:
        <br />
        (a)Cybex has the right to unilaterally decide whether you have violated
        any of the aforementioned undertakings, and to carry out any measures or
        terminate the Services provided to you in accordance with the Relevant
        Rules without your consent or prior notice to you.
        <br />
        (b)Where any legal document made effective by the administrative or
        judicial authorities of any country confirms that you have performed an
        illegal or infringing act, or where Cybex unilaterally determines that
        your actions may violate the provisions of these terms and conditions
        and/or the Relevant Rules or may violate any applicable laws and
        regulations, Cybex has the right to publicize such illegal acts or
        violations of contract and the measures that Cybex has taken against you
        on the Platform. 
        <br />
        (c)Regarding your actions on the Platform, including actions that have
        not yet been carried out on the Platform but has already affected
        the Platform and other users, Cybex has the right to unilaterally
        determine the nature of your action and whether it constitutes a
        violation of these terms and conditions and/or the Relevant Rules, and
        carry out corresponding enforcement actions. You must retain all
        evidence related to your actions, and bear the consequences of not
        having sufficient evidence. 
        <br />
        (d)You must individually bear all legal liabilities arising from the
        damages caused to any third party caused by possible violations of these
        terms and conditions, and ensure that Cybex and its affiliated parties
        are exempt from any resulting losses or costs. 
        <br />
        (e)If Cybex suffers from any loss, is subject to any third-party claims,
        or is penalized by any government department as a result of your
        violations of any relevant laws, these terms and conditions or any
        Relevant Rules, you must compensate Cybex for the losses and/or costs
        incurred, including reasonable legal fees.  
      </li>
    </ol>
    <h3 className="center title-sub">Special Authorization</h3>
    <p>
      You fully understand and irrevocably grant the following rights to Cybex
      and its affiliated parties:
    </p>
    <ol>
      <li>
        1. Once you have made an undertaking in any form to Cybex and/or its
        affiliated parties, and the associated company has confirmed your
        violation of such undertaking, Cybex has the right to restrict your
        account in accordance with your undertaking or measures agreed in these
        terms and conditions, including the suspension and termination of
        Services provided to you, and to publicize the violation confirmed by
        the affiliated company. You understand and agree that Cybex is not
        required to verify such confirmation with you, or to obtain your
        consent, and Cybex will not bear any responsibility for the restriction
        measures or publications taken against you. 
      </li>
      <li>
        2. Once you violate these terms and conditions or any Relevant Rules, or
        other agreements made with Cybex or its affiliated parties, Cybex has
        the right to notify its affiliated parties in any manner, and request
        them to impose restrictions on you, including but are not limited to
        suspend or terminate services provided to you (in part or in full), or
        to publicize your violation on any website that it operates or
        effectively controls etc.    
      </li>
      <li>
        3. You hereby grant Cybex and its affiliated parties an exclusive,
        worldwide, perpetual, sub-licensable and free right to use any
        information or data you have provided. In addition, Cybex and its
        affiliated parties have the right (fully or partially) to use, copy,
        revise, edit, publish, translate, disseminate, execute and display all
        of your information and data (including but not limited to, registration
        information, transaction data, and various types of information
        displayed on the Platform), or create derivative works, and use any
        form, media or technology currently known or developed in the future to
        incorporate such data or information in other works. 
      </li>
    </ol>
    <h3 className="center title-sub">Representations and Warranties</h3>
    <ol>
      <li>
        1. Users hereby agree and acknowledge that：
        <br />
        (a)you will only operate an Account and use the Platform to subscribe
        for Digital Assets for the purposes and in accordance with these terms
        and conditions;
        <br />
        (b)you are duly authorized and have the capacity to enter into each
        transaction on the Platform;
        <br />
        (d)Not to use any devices, software or routine procedures to interfere
        or attempt to interfere with the normal operation of the Platform, or
        any transaction or activity carried out on the Platform. You must not
        carry out any action that will cause a large data load to the network
        system of the Platform.  
        <br />
        (c)you are responsible for any tax liability arising from the holding of
        or transacting in Digital Assets and will indemnify us where we are
        obliged to pay tax on your behalf in respect of your Account or any
        Digital Assets held by you and you authorize us to withhold any tax
        liability amounts as required by any applicable tax law;
        <br />
        (d)you will be fully responsible for any content including any text,
        file, image, photo, video, audio, music and any other information that
        you uploaded, posted, spread, and sent (including communications by
        e-mail) on the Platform.
        <br />
        (e)you will comply with all applicable laws in any jurisdiction in which
        or from which you seek to operate your Account;
        <br />
        (f)all digital assets or amounts deposited into your Account comes from
        legal sources which you own or otherwise have full legal authority to
        deal with; and
        <br />
        (g)you acknowledge that you understand and accept the risks involved in
        any participation of transactions of Digital Assets you make through the
        Platform;
        <br />
        (h)participating in ETO is a high-risk activity which means you may
        potentially lose all the money or digital assets you invest;
        <br />
        (i)there may not be any liquidity, buyers or future buyers for the
        Digital Assets you hold;
        <br />
        (j)the Digital Assets may be prohibited from being exchanged for other
        digital assets or fiat currency due to changes in laws or regulations;
        <br />
        (k)we make no representation about, nor gives any guarantee of, future
        performance, future profitability or return of moneys or currencies paid
        in respect of any Digital Assets listed on the Platform;
      </li>
      <li>
        2. Issuers hereby agree and acknowledge that：
        <br />
        (a)your use of the Platform does not infringe the rights of any third
        party or any applicable law;
        <br />
        (d)you are duly authorized and have the capacity to enter into each
        transaction on the Platform;
        <br />
        (c)you are responsible for any commercial activities or promotions over
        the Platform;
        <br />
        (d)you are responsible for the accuracy and information contained in any
        whitepaper or any documents provided by you on the Platform in respect
        of your Digital Assets;
        <br />
        (e)you are responsible for any agreements, terms, guarantees and
        statements between you and the Users;
        <br />
        (f)you will fully indemnify us for all costs including legal costs that
        we incur if we defend ourselves in relation to a claim made by Users
        against us in respect of your Digital Assets; and
        <br />
        (g)you will not use the Platform to perform any illegal activity of any
        sort, including but not limited to illegal fundraising, money laundering
        or terrorism financing.
      </li>
      <li>
        3. Cybex hereby agrees and acknowledges that：
        <br />
        (a)To the maximum extent permitted by law, we make no warranties or
        representations about this Platform or the Content, including but not
        limited to warranties or representations that they will be complete,
        accurate or up-to-date, that access will be uninterrupted or error-free
        or free from viruses, or that this website will be secure.
        <br />
        (d)We reserve the right to restrict, suspend or terminate your access to
        the Platform or any Content at any time without notice and we will not
        be responsible for any loss, cost, damage or liability that may arise as
        a result.
      </li>
    </ol>
    <h3 className="center title-sub"> Disclaimer </h3>
    <ol>
      <li>
        1. Independence
        <br />
        Cybex, including its partners, officers, employees, directors, agents,
        or any other relevant parties, will always maintain our independence
        with any issuers and users, and is not affiliated with or does not
        endorse or sponsor any of projects listed on our platform. Although
        Cybex may charge a service fee for providing Services, neither offering
        nor subscribing any digital assets through our platform shall be
        constructed to create any form of partnership, joint venture or any
        other similar relationship with us.
      </li>
      <li>
        {" "}
        2. No Recommendation or Advice
        <br />
        We will have a certain degree of review of the issuer’s basic
        information and their projects before posting information about issuers
        and their projects, however, in no event shall Cybex be deemed to
        provide any investment, legal, tax, financial or otherwise
        recommendations and advice or take any personal circumstances into
        consideration. Decisions to participate in ETO and to buy, sell or hold
        any digital assets involve risk and shall be based on your own judgement
        or the advice of qualified financial professionals.
      </li>
      <li>
        {" "}
        3. No Profit Guarantee
        <br />
        Cybex is not a broker-dealer or financial adviser and is not affiliated
        with any investment advisory firms. The use of any data or information
        about ETO and any other related content provided by Cybex or through our
        platform, does not and cannot guarantee that you will make profits or
        will not incur losses. You must rely on your own judgment or consult a
        professional for advice on such matters. You must consider carefully
        whether Information is suitable for you in light of your financial
        condition and ability to bear financial risks.
      </li>
      <li>
        {" "}
        4. Project Information
        <br />
        All information, data, whitepapers and other materials (“information”)
        concerning issuers and their projects is provided by issuers
        individually and that such information may contain risks and flaws, and
        issuer is solely responsible for the accuracy of all statements it has
        made and information it has provided. Cybex is merely a platform where
        you can obtain issuers and projects information and carry out
        transactions, and cannot control the quality, safety or legality of the
        projects, the truthfulness and accuracy of the issuer’s information, or
        the capabilities of various issuers in fulfilling their obligations
        stipulated in transactions. Cybex makes no representations and disclaims
        all warranties, express or implied, including but not limited to
        accuracy, timeliness, completeness merchantabilities or fitness of any
        information and accept no liability (whether in tort or contract or
        otherwise) for any loss or damage arising from any inaccuracy or
        omission or from any decision, action or non-action based on or in
        reliance upon information.
      </li>
      <li>
        {" "}
        5. Regulatory Measures
        <br />
        Depending on your country of residence, you may not be able to use all
        the Services on the platform. You shall be obliged to abide by those
        rules and laws in your country of residence and/or country from which
        you access to our platform and Services. Furthermore, since regulatory
        policies could change from time to time, existing regulatory permission
        or tolerance in any jurisdiction could be just temporary. You should
        immediately cease using our platform and Services if you were not
        legally allowed or not meet the qualifications required by those rules
        and laws.
      </li>
      <li>
        {" "}
        6. Identifications Information
        <br />
        Although Cybex is a decentralized platform of digital-asset transaction,
        we may still need to carry out “know your customer” survey (hereinafter
        be referred to as “KYC”) subject to certain relevant requirements of
        applicable laws or regulations. We may request identification
        information (such as driver’s license, identity card, government issued
        photographic identification, utility bills, banking account information,
        or similar) for the purpose of reducing money laundering and terrorism
        financing incidents. When using the Services, you should provide
        relevant personal information according to our requirements and update
        your personal information from time to time in order to ensure it
        remains true, updated, complete and accurate. If there are reasonable
        grounds to doubt that the information you provided is incorrect, false,
        outdated or incomplete, Cybex has the right to make an inquiry and/or
        request changes, and also has the right to directly delete any
        corresponding information, until the suspension or termination of the
        Services (in full or in part) provided to you. Cybex does not assume any
        responsibility in this respect, and you are liable for any resulting
        direct or indirect losses and adverse consequences.
      </li>
      <li>
        {" "}
        7. Validity
        <br />
        Since Cybex is a decentralized trading platform, if the users do not
        participate in crowdfunding through the official channel (front-end
        entry on ETO web page) as we require and offer, for instance, it can
        also be directly transferred to the crowdfunding address by means of
        API, which is temporarily impossible to be prevented at the technical
        level. However, as operator of the platform, we do not recognize the
        amount of crowdfunding through unfair channels as effective and do not
        refund any amount of crowdfunding through informal channels. The invalid
        crowdfunding includes but not limited to: (a) Fundraising in
        non-crowdfunding tokens; (b) Fundraising exceeding the personal limit;
        (c) Fundraising outside of project’s normal crowdfunding period; and (d)
        Fundraising by non-whitelist users.
      </li>
      <li>
        {" "}
        8. Popularity and Liquidity
        <br />
        Any digital assets listed or traded on our platform (hereinafter be
        referred to as “listed assets”) is not a currency issued by any
        individual, entity, central bank or national, supra-national or
        quasi-national organization, nor is it backed by any hard assets or
        other credit. The value of listed asset hinges heavily on the popularity
        of its project. The worst-case scenario is that listed assets may even
        remain marginalized in a long term, appealing to only a minimal portion
        of the users. Trading of listed assets merely depends on the consensus
        on its value between the relevant market participants. Cybex will not
        (nor has the obligation or responsibility to) stabilize or otherwise
        affect and make no guarantee about any listed asset’s market price.
      </li>
      <li>
        {" "}
        9. Fluctuations
        <br />
        The participation in or purchase and selling of Digital Assets involves
        significant risk which is not generally shared with official fiat
        currencies or goods or commodities in a market. Unlike most fiat
        currencies, these Digital Assets are based on technology and trust.
        There is no central bank or another entity that can take corrective
        measure to protect the value or manage the supply and demand of the
        Digital Assets during. The prices of Digital Assets may suffer a large
        fluctuation in value and may become worthless. Cybex will not (nor has
        the obligation or responsibility to) stabilize or otherwise affect and
        make no guarantee about any digital asset’s market price. You should
        carefully assess whether your objectives, financial situation, needs,
        experience and tolerance for risk is suitable for participating, buying
        or selling Digital Assets.
      </li>
    </ol>
    <h3 className="center title-sub">
       Scope of Responsibility and Limitation of Liability{" "}
    </h3>
    <ol>
      <li>
        1. Cybex will provide the Services to you on an “as is" and "as
        available" basis. However, Cybex does not make any express or implied
        warranties in relation to the Services, including but not limited to the
        suitability of the Services, the Services contain no errors or
        omissions, and durability, accuracy, reliability, and fitness for a
        particular purpose of the Services. Cybex does not make any undertakings
        or guarantees regarding the validity, accuracy, correctness,
        reliability, quality, stability, completeness and timeliness of the
        technology and information related to the Services. 
      </li>
      <li>
        2. To the maximum extent permitted by law, in no event shall we be
        liable for any direct and indirect loss, damage or expense –
        irrespective of the manner in which it occurs – which may be suffered
        due to your use of our Services or our Platform and/or the information
        or materials contained on it, or as a result of the inaccessibility of
        this Platform and/or the fact that certain information or materials
        contained on it are incorrect, incomplete or not up-to-date.
      </li>
      <li>
        3. Without limiting the above, we will not be held liable for:
        <br />
        (a)whether under contract law, torts law or otherwise, any business
        losses, loss of revenue, income, profits, opportunity or anticipated
        savings, loss of contracts or business relationships, loss of reputation
        or goodwill, and any other indirect, special or consequential loss.
        <br />
        (b)any loss or damage caused by a virus, corruption of information or
        data, distributed denial-of-service attack, or other technologically
        harmful material that may infect your computer equipment, computer
        programs, data or other proprietary material due to your use of our
        Platform or to your downloading of any content on it, or on any website
        linked to it.
      </li>
      <li>
        4. These limitations of liability apply even if a loss was foreseeable,
        or if we have been expressly advised of the potential loss.
      </li>
      <li>
        5. Nothing in these terms and conditions excludes or limits the
        liability of any party for fraud, death or personal injury caused by its
        negligence, breach of terms and conditions implied by operation of law,
        or any other liability which may not by law be limited or excluded.
      </li>
      <li>
        6. Subject to the foregoing, our aggregate liability in respect of
        claims based on events arising out of or in connection with any User or
        Issuer’s use of the Platform and/or Service, whether in contract or tort
        (including negligence) or otherwise, shall in no circumstances exceed
        the greater of either:
        <br />
        (a)the total amount held on Account for the User or Issuer making a
        claim less any amount of applicable withdrawal fees; or
        <br />
        (b)100% of the amount of the transactions that are the subject of the
        claim less any amount of commission that may be due and payable in
        respect of such transactions; and our total aggregate liability shall
        not exceed $5,000 for each User or Issuer.
      </li>
    </ol>
    <h3 className="center title-sub">Termination</h3>
    <ol>
      <li>
        1. You agree that Cybex has the right and full discretion and for any
        reason without prior notice to suspend or terminate part of or all of
        the Services provided to you, to temporarily freeze or permanently
        freeze (cancel) your account’s rights and access on the Platform, and
        will not be liable to you or any third party. 
      </li>
      <li>
        2. Cybex has the right to terminate these terms and conditions and
        permanently freeze (cancel) your account’s rights and access on
        the Platform in the following circumstances:
        <br />
        (a)The email address you have provided does not exist or is unable to
        receive emails, and there are no other ways to contact you, or Cybex
        notifies you through other means to change your email information but
        you have not changed your email to a valid email address within three
        (3) working days of our notification;
        <br />
        (b)Core identification information you have provided is untrue,
        inaccurate, outdated or incomplete;
        <br />
        (c)These terms and conditions (including the Relevant Rules) has been
        revised, and you express and notify Cybex that you are not willing to
        accept such terms and conditions or the Relevant Rules; and
        <br />
        (d)Any other circumstances where Cybex believes that any Service should
        be terminated. 
      </li>
      <li>
        3. Cybex has no obligation to retain or disclose to you any information
        in your account, or forward to you or any third party any information
        you have not read or has been sent after your account has been
        terminated or your account’s rights and access on the Platform have been
        permanently frozen (cancelled).
      </li>
      <li>
        4. You agree that after you and Cybex’s contractual relationship has
        been terminated, Cybex still enjoys the following rights:
        <br />
        (a)To save your identification information and all transaction
        information generated during your use of the Services;
        <br />
        (b)If you have committed an illegal act or a breach of these terms and
        conditions and/or the Relevant Rules during your use of the Services,
        Cybex may still makes claim against you in accordance with these terms
        and conditions. 
      </li>
    </ol>
    <h3 className="center title-sub">Privacy Policy </h3>
    <p>
      Cybex will publish its privacy policy on the Platform, and may revise it
      from time to time. The privacy policy constitutes an effective part of
      these terms and conditions.
    </p>
    <h3 className="center title-sub">Applicable Law and Dispute Resolution</h3>
    <p>
      The effectiveness, interpretation, revisions, implementation and dispute
      resolution of these terms and conditions will be subject to the laws of
      the Republic of Singapore and any conflicting legal rules or principles of
      Singapore will not be applicable to these terms and conditions. All
      disputes, issues or claims arising from these terms and conditions,
      including breach of contract and the validity and termination of these
      terms and conditions, will be arbitrated in Singapore International
      Arbitration Centre (hereinafter be referred to as “SIAC”) using the
      effective SIAC rules valid at the time of submission of the arbitration
      notice.
    </p>
  </div>
);

class EtoModal extends React.Component<props, { fadeOut?; neverShow? }> {
  constructor(props) {
    super(props);
    this.state = {
      neverShow: false
    };
  }

  handleNeverShow = e => {
    let neverShow = e.target.checked;
    this.setState({
      neverShow
    });
    ModalActions.neverShow(this.props.modalId, neverShow);
    return e.target.value;
  };

  render() {
    let { modalId, open, locale, accountName } = this.props;
    return (
      open && (
        <BaseModal modalId={this.props.modalId}>
          <div className="modal-content game-modal">
            {locale === "zh" ? ContentZh : ContentEn}
          </div>
        </BaseModal>
      )
    );
  }
}

const EtoModalWapper: EtoModal = connect(
  EtoModal,
  {
    listenTo() {
      return [ModalStore, IntlStore];
    },
    getProps(props) {
      let { modalId } = props;
      return {
        locale: IntlStore.getState().currentLocale,
        open: ModalStore.getState().showingModals.has(modalId)
      };
    }
  }
) as any;
export { EtoModalWapper as EtoLegalModal };
export const DEFAULT_ETOMODAL_ID = "#$DEFAULT_ETOMODAL_ID";
export default EtoModalWapper;
