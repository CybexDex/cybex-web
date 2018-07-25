import * as React from "react"; 
import * as PropTypes from "prop-types";

import Modal from "react-foundation-apps/src/modal";
import Trigger from "react-foundation-apps/src/trigger";
import foundationApi from "react-foundation-apps/src/utils/foundation-api";

// import Button from "../../Common/Button";
import BindToChainState from "../../Utility/BindToChainState";
import AccountInfo from "../../Account/AccountInfo";
import { Button } from "components/Common/Button";
// import AccountStore from "../../../stores/AccountStore";
import AccountStore from "stores/AccountStore";
import { connect } from "alt-react";
import "./LegalModal.scss";
import Translate from "react-translate-component";
import * as fetchJson from "../service";



export class AlertModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fadeOut: false
    };
  }

  onClose = () => {
    this.setState({
      fadeOut: true
    });
    // setTimeout(() => {
    //   ModalActions.hideModal(this.props.modalId);
    // }, 300);
    // if (this.props.onClose) {
    //   this.props.onClose();
    // }
  };
  componentDidMount(){
    console.log(Trigger);
  }
  componentWillReceiveProps(n){
    this.setState({
      isShow: n.isShow
    });
  }
  cao = () => {
    foundationApi.publish(this.props.id, "close");
  }
  submits() {
    this.sentdata({
      user:this.props.accountsWithAuthState[0],
      project: this.props.project,
      msg: {
        code: this.refs.codeInput.value
      }
    });
  }

  sentdata(data){
    fetchJson.fetchCreatUser(data, (res)=>{
      if(res.code == -1){
        this.setState({
          errorMsg: res.result
        });
      }
      this.props.cb();
    });
  }
  render() {
    // let { fade, overlay, noCloseBtn, overlayClose } = this.props;
    // let { fadeOut, isShow } = this.state;
    return (
      <Modal
        id={this.props.id}
        // overlay={props.overlay}
        // onClose={props.onClose}
        // className={props.className}
        // overlayClose={props.overlayClose}
      >
      <Trigger close={this.props.id}>
        <a href="#" className="close-button">
          &times;
        </a>
      </Trigger>
      <div className="modal-container">
      <div className="modal-content">
      
        <div className="title-holder">
          <h3 className="center title">Terms and Conditions</h3>
          <p>These Terms and Conditions are concluded between and by you and Cybex, the operator of a digital assets trading platform (hereinafter be referred to as the “Platform”), and shall be an effective agreement. 
</p>
<p>CYBEX SYSTEM PTE. LTD., a corporation duly is establishing under the laws of the Republic of Singapore, operates a decentralised platform allowing registered Users (hereinafter be referred to as “Users”) to subscribe for digital currencies, coins and tokens (hereinafter be referred to as “Digital Assets”) from Cybex and/or Issuers (hereinafter be referred to as “Issuers”) and to participate voluntarily in Earlybirds Token offering (hereinafter be referred to as “ETO”) (hereinafter be referred to as “Service”). We, including our partners, officers, employees, directors, or agents, hereby issue these Terms and Conditions, which include our disclaimer (hereinafter be referred to as “Disclaimer”) to fully disclose the risks in the process of your using Service and to state expressly our limitation of liability.
</p>
<p>In these Terms, “us”, “we”, “our” and “Cybex” means CYBEX SYSTEM PTE. LTD., its owners, directors, investors, employees, related bodies corporate or other related parties. “Cybex” may also refer to the Services, products, website, content or other materials provided by Cybex as the context requires.
</p>
<p>The website (www.cybex.io) is owned and operated by Cybex. By accessing to our website and platform, and further by registering to use our Service, you agree to accept any and all terms and conditions as well as Disclaimer published by the Platform. You should read our Disclaimer and other terms and conditions carefully and immediately cease using our Service if you do not agree with any terms.
</p>
<p>We solemnly remind that: any organization or individual who access to our platform or Service is deemed to have fully understood, acknowledged and accepted the entire contents of these terms and conditions. Cybex reserves the right to amend and interpret these terms and conditions including without limitation our Disclaimer.
</p>









          <h3 className="center title-sub">Content and Execution</h3>
<ol>
	<li>1.	These terms and conditions includes all rules already or will be published by Cybex (hereinafter referred to as the “Relevant Rules”). All Relevant Rules are an integral part of these terms and conditions and have the same legal effect as these terms and conditions. Except otherwise expressly stated, any Services hereunder provided by the Platform, Cybex or its affiliated parties will be bound by these terms and conditions.
	</li><li>2.	You must carefully read the full content of these terms and conditions before using the Services. If you have any questions regarding these terms and conditions, you should consult us (E-mail: service@cybex.io). However, regardless of whether you have actually read these terms and conditions carefully before using the Services, as long as you use the Services, you will be deemed to be bound by these terms and conditions. You may not use the reasons of not having read these terms and conditions or not having received answers to inquiries from us as a basis to invalidate or cancel these terms and conditions. 
	</li><li>3.	Cybex has the right to amend these terms and conditions and/or any Relevant Rules at any time according to its needs. The amended and restated terms will be posted at the Platform, and you will not be notified individually. The amended and restated terms and conditions and/or Relevant Rules will automatically take effect once it is posted at the Platform. If you do not agree with the changes, you must cease use of the Services immediately. Your continued use of the Services shall be deemed as your acceptance of the amended terms and conditions and/or Relevant Rules. In the event that you do not agree to the revised terms, you must not access the Platform or our Service and you should contact us at the following email address to close your Account: service@cybex.iowoaknwoakn. Please check this page from time to time to take notice of any changes we made, as they are binding on you.
	</li><li>4.	For certain campaigns, promotions or contests, additional terms and conditions may apply. If you want to participate in such a campaign, promotion or contest, you need to agree to the relevant terms and conditions applicable to that campaign, promotion or contest. In case of any inconsistency between such terms and conditions and these Terms, those terms and conditions will prevail.
	</li><li>5.	There may be additional and/or optional software which you may download on which we may provide some of our Services to you. Additional terms and conditions may apply to the software. If you download these software, you need to agree to the relevant terms and conditions applicable to them. In case of any inconsistency between such terms and conditions and these Terms, those terms and conditions will prevail.
</li>
</ol>
<h3 className="center title-sub">Registration and Accounts</h3>
<ol>
  

  	<li>1. 	Eligibility of Users <br />
    	By using the Services in a manner allowed by Cybex, you acknowledge that you must be:
      <br />(a)  A natural person of at least 18 years of age, a legal person, or other organization;
      <br />(b)  Has full legal right and ability to enter into a legally binding agreement with us;
      <br />(c)  Has full legal right and ability to enter into a legally binding agreement with us;
      <br />(d)  Accredited investor in accordance with applicable laws and regulations, if any.
      <br />If you do not meet these eligibility requirements, you must bear all resulting consequences, and Cybex has the right to cancel or permanently freeze your account, and make claims against you. 
	</li><li>2. 	Registrtion and Account 
  <br />(a) From your first use of our Platform and have read and agreed to the provisions of these terms and conditions, or when you use the Services via other methods allowed by Cybex, you will be bound to these terms and conditions and all Relevant Rules. 
  <br />(b) Unless there are legal provisions or judicial decisions, or in compliance with the Cybex’s conditions, otherwise your login name and password may not be transferred, gifted or inherited by any means. Transfers, gifts or inheritances may only be processed after providing necessary documents as requested by us, and will be handled in accordance with our operating procedures.
  </li><li>3.  User Information
  <br />(a) When using the Services, you should update your user information from time to time in order to ensure it remains true, updated, complete and accurate. If there are reasonable grounds to doubt that the information you provided is incorrect, false, outdated or incomplete, Cybex has the right to make an inquiry and/or request changes, and also has the right to directly delete any corresponding information, until the suspension or termination of the Services (in full or in part) provided to you. Cybex does not assume any responsibility in this respect, and you are liable for any resulting direct or indirect losses and adverse consequences. 
  <br />(b) You must accurately fill in and update the contact information you provide to Cybex such as email address, contact number, address etc., in order for Cybex to effectively contact you if necessary. If you cannot be contacted by such contact information, you are solely responsible for any resulting losses or costs incurred while using the Services. You understand and agree that you must maintain the validity of the contact information you provide, any changes or updates must be carried out in accordance with Cybex’s requirements. 
	</li><li>4. 	Account Safety
  <br />You are solely responsible for the confidentiality of your login name and password, and all activities that occur under your login name and password (including, but not limited to, disclosure or release of information, or using services online etc.) You agree:
  <br />(a) To immediately inform us and authorize Cybex provide such information to the Platform in the event that you discover any unauthorized usage of your login name and password or any other situation that violates the confidentiality provisions between you and Cybex; and 
  <br />(b) To correctly exit / log-out of the Platform / Services at the end of each online session. We cannot and will not take responsibility for any losses or damages that are incurred as a result of your failure to comply with this provision. 
</li>
</ol>
<h3 className="center title-sub">Guidelines on the Use of Services</h3>
<ol>

	<li>1. 	During your use of the Services of the Platform, you undertake to comply with the following provisions: 
  <br />(a)All acts conducting during use of the Services must comply with all applicable national laws, regulations, rules and requirements, must not violate social public interest or public morals, must not adversely affect the legitimate rights and interests of others, and must not violate these terms and conditions as well as the Relevant Rules. If you violate any of the above undertakings, and the violation results in any legal consequences, you must individually bear all legal responsibilities, and ensure that Cybex and its affiliated parties are exempt from any resulting losses.  
  <br />(b)To act in good faith, not to undertake any behavior of unfair competition, not to disturb the normal order of transactions, and not to engage in actions unrelated to transactions.
  <br />(c)Not to commercially use any data of the Platform, including but not limited to, to not copy or disseminate etc. and use information displayed on the Platform without the prior written consent of Cybex. 
  <br />(d)Not to use any devices, software or routine procedures to interfere or attempt to interfere with the normal operation of the Platform, or any transaction or activity carried out on the Platform. You must not carry out any action that will cause a large data load to the network system of the Platform.  
	</li><li>2. 	You understand and agree that: 
  <br />(a)Cybex has the right to unilaterally decide whether you have violated any of the aforementioned undertakings, and to carry out any measures or terminate the Services provided to you in accordance with the Relevant Rules without your consent or prior notice to you.
  <br />(b)Where any legal document made effective by the administrative or judicial authorities of any country confirms that you have performed an illegal or infringing act, or where Cybex unilaterally determines that your actions may violate the provisions of these terms and conditions and/or the Relevant Rules or may violate any applicable laws and regulations, Cybex has the right to publicize such illegal acts or violations of contract and the measures that Cybex has taken against you on the Platform. 
  <br />(c)Regarding your actions on the Platform, including actions that have not yet been carried out on the Platform but has already affected the Platform and other users, Cybex has the right to unilaterally determine the nature of your action and whether it constitutes a violation of these terms and conditions and/or the Relevant Rules, and carry out corresponding enforcement actions. You must retain all evidence related to your actions, and bear the consequences of not having sufficient evidence. 
  <br />(d)You must individually bear all legal liabilities arising from the damages caused to any third party caused by possible violations of these terms and conditions, and ensure that Cybex and its affiliated parties are exempt from any resulting losses or costs. 
  <br />(e)If Cybex suffers from any loss, is subject to any third-party claims, or is penalized by any government department as a result of your violations of any relevant laws, these terms and conditions or any Relevant Rules, you must compensate Cybex for the losses and/or costs incurred, including reasonable legal fees.  
</li>
</ol>
        <h3 className="center title-sub">Special Authorization</h3>
<p>You fully understand and irrevocably grant the following rights to Cybex and its affiliated parties:
</p>
<ol>
<li>1.     Once you have made an undertaking in any form to Cybex and/or its affiliated parties, and the associated company has confirmed your violation of such undertaking, Cybex has the right to restrict your account in accordance with your undertaking or measures agreed in these terms and conditions, including the suspension and termination of Services provided to you, and to publicize the violation confirmed by the affiliated company. You understand and agree that Cybex is not required to verify such confirmation with you, or to obtain your consent, and Cybex will not bear any responsibility for the restriction measures or publications taken against you. 
</li><li>2.     Once you violate these terms and conditions or any Relevant Rules, or other agreements made with Cybex or its affiliated parties, Cybex has the right to notify its affiliated parties in any manner, and request them to impose restrictions on you, including but are not limited to suspend or terminate services provided to you (in part or in full), or to publicize your violation on any website that it operates or effectively controls etc.    
</li><li>3.     You hereby grant Cybex and its affiliated parties an exclusive, worldwide, perpetual, sub-licensable and free right to use any information or data you have provided. In addition, Cybex and its affiliated parties have the right (fully or partially) to use, copy, revise, edit, publish, translate, disseminate, execute and display all of your information and data (including but not limited to, registration information, transaction data, and various types of information displayed on the Platform), or create derivative works, and use any form, media or technology currently known or developed in the future to incorporate such data or information in other works. 
</li></ol> 
<h3 className="center title-sub">Representations and Warranties</h3>
<ol>
  <li>
1. 	Users hereby agree and acknowledge that：
        <br />(a)you will only operate an Account and use the Platform to subscribe for Digital Assets for the purposes and in accordance with these terms and conditions;
        <br />(b)you are duly authorized and have the capacity to enter into each transaction on the Platform;
        <br />(d)Not to use any devices, software or routine procedures to interfere or attempt to interfere with the normal operation of the Platform, or any transaction or activity carried out on the Platform. You must not carry out any action that will cause a large data load to the network system of the Platform.  
        <br />(c)you are responsible for any tax liability arising from the holding of or transacting in Digital Assets and will indemnify us where we are obliged to pay tax on your behalf in respect of your Account or any Digital Assets held by you and you authorize us to withhold any tax liability amounts as required by any applicable tax law;
        <br />(d)you will be fully responsible for any content including any text, file, image, photo, video, audio, music and any other information that you uploaded, posted, spread, and sent (including communications by e-mail) on the Platform.
        <br />(e)you will comply with all applicable laws in any jurisdiction in which or from which you seek to operate your Account;
        <br />(f)all digital assets or amounts deposited into your Account comes from legal sources which you own or otherwise have full legal authority to deal with; and
        <br />(g)you acknowledge that you understand and accept the risks involved in any participation of transactions of Digital Assets you make through the Platform;
        <br />(h)participating in ETO is a high-risk activity which means you may potentially lose all the money or digital assets you invest;
        <br />(i)there may not be any liquidity, buyers or future buyers for the Digital Assets you hold;
        <br />(j)the Digital Assets may be prohibited from being exchanged for other digital assets or fiat currency due to changes in laws or regulations; 
        <br />(k)we make no representation about, nor gives any guarantee of, future performance, future profitability or return of moneys or currencies paid in respect of any Digital Assets listed on the Platform;
</li><li>
2.    Issuers hereby agree and acknowledge that：
<br />(a)your use of the Platform does not infringe the rights of any third party or any applicable law;
<br />(d)you are duly authorized and have the capacity to enter into each transaction on the Platform;
<br />(c)you are responsible for any commercial activities or promotions over the Platform;
<br />(d)you are responsible for the accuracy and information contained in any whitepaper or any documents provided by you on the Platform in respect of your Digital Assets;
<br />(e)you are responsible for any agreements, terms, guarantees and statements between you and the Users;
<br />(f)you will fully indemnify us for all costs including legal costs that we incur if we defend ourselves in relation to a claim made by Users against us in respect of your Digital Assets; and
<br />(g)you will not use the Platform to perform any illegal activity of any sort, including but not limited to illegal fundraising, money laundering or terrorism financing.
</li><li>
	3. 	Cybex hereby agrees and acknowledges that：
  <br />(a)To the maximum extent permitted by law, we make no warranties or representations about this Platform or the Content, including but not limited to warranties or representations that they will be complete, accurate or up-to-date, that access will be uninterrupted or error-free or free from viruses, or that this website will be secure.
  <br />(d)We reserve the right to restrict, suspend or terminate your access to the Platform or any Content at any time without notice and we will not be responsible for any loss, cost, damage or liability that may arise as a result.
</li>
        </ol>
        <h3 className="center title-sub"> Disclaimer </h3>
        <ol>
<li>
	1. 	Independence 
        <br />Cybex, including its partners, officers, employees, directors, agents, or any other relevant parties, will always maintain our independence with any issuers and users, and is not affiliated with or does not endorse or sponsor any of projects listed on our platform. Although Cybex may charge a service fee for providing Services, neither offering nor subscribing any digital assets through our platform shall be constructed to create any form of partnership, joint venture or any other similar relationship with us.
</li><li>	2. 	No Recommendation or Advice 
<br />We will have a certain degree of review of the issuer’s basic information and their projects before posting information about issuers and their projects, however, in no event shall Cybex be deemed to provide any investment, legal, tax, financial or otherwise recommendations and advice or take any personal circumstances into consideration. Decisions to participate in ETO and to buy, sell or hold any digital assets involve risk and shall be based on your own judgement or the advice of qualified financial professionals.
</li><li>	3. 	No Profit Guarantee 
<br />Cybex is not a broker-dealer or financial adviser and is not affiliated with any investment advisory firms. The use of any data or information about ETO and any other related content provided by Cybex or through our platform, does not and cannot guarantee that you will make profits or will not incur losses. You must rely on your own judgment or consult a professional for advice on such matters. You must consider carefully whether Information is suitable for you in light of your financial condition and ability to bear financial risks.
</li><li>	4. 	Project Information
<br />All information, data, whitepapers and other materials (“information”) concerning issuers and their projects is provided by issuers individually and that such information may contain risks and flaws, and issuer is solely responsible for the accuracy of all statements it has made and information it has provided. Cybex is merely a platform where you can obtain issuers and projects information and carry out transactions, and cannot control the quality, safety or legality of the projects, the truthfulness and accuracy of the issuer’s information, or the capabilities of various issuers in fulfilling their obligations stipulated in transactions. Cybex makes no representations and disclaims all warranties, express or implied, including but not limited to accuracy, timeliness, completeness merchantabilities or fitness of any information and accept no liability (whether in tort or contract or otherwise) for any loss or damage arising from any inaccuracy or omission or from any decision, action or non-action based on or in reliance upon information. 
</li><li>	5. 	Regulatory Measures
<br />Depending on your country of residence, you may not be able to use all the Services on the platform. You shall be obliged to abide by those rules and laws in your country of residence and/or country from which you access to our platform and Services. Furthermore, since regulatory policies could change from time to time, existing regulatory permission or tolerance in any jurisdiction could be just temporary. You should immediately cease using our platform and Services if you were not legally allowed or not meet the qualifications required by those rules and laws.
</li><li>	6. 	Identifications Information 
<br />Although Cybex is a decentralized platform of digital-asset transaction, we may still need to carry out “know your customer” survey (hereinafter be referred to as “KYC”) subject to certain relevant requirements of applicable laws or regulations. We may request identification information (such as driver’s license, identity card, government issued photographic identification, utility bills, banking account information, or similar) for the purpose of reducing money laundering and terrorism financing incidents. When using the Services, you should provide relevant personal information according to our requirements and update your personal information from time to time in order to ensure it remains true, updated, complete and accurate. If there are reasonable grounds to doubt that the information you provided is incorrect, false, outdated or incomplete, Cybex has the right to make an inquiry and/or request changes, and also has the right to directly delete any corresponding information, until the suspension or termination of the Services (in full or in part) provided to you. Cybex does not assume any responsibility in this respect, and you are liable for any resulting direct or indirect losses and adverse consequences.
</li><li>	7. 	Validity 
<br />Since Cybex is a decentralized trading platform, if the users do not participate in crowdfunding through the official channel (front-end entry on ETO web page) as we require and offer, for instance, it can also be directly transferred to the crowdfunding address by means of API, which is temporarily impossible to be prevented at the technical level. However, as operator of the platform, we do not recognize the amount of crowdfunding through unfair channels as effective and do not refund any amount of crowdfunding through informal channels. The invalid crowdfunding includes but not limited to: (a) Fundraising in non-crowdfunding tokens; (b) Fundraising exceeding the personal limit; (c) Fundraising outside of project’s normal crowdfunding period; and (d) Fundraising by non-whitelist users.
</li><li>	8. 	Popularity and Liquidity
<br />Any digital assets listed or traded on our platform (hereinafter be referred to as “listed assets”) is not a currency issued by any individual, entity, central bank or national, supra-national or quasi-national organization, nor is it backed by any hard assets or other credit. The value of listed asset hinges heavily on the popularity of its project. The worst-case scenario is that listed assets may even remain marginalized in a long term, appealing to only a minimal portion of the users. Trading of listed assets merely depends on the consensus on its value between the relevant market participants. Cybex will not (nor has the obligation or responsibility to) stabilize or otherwise affect and make no guarantee about any listed asset’s market price.
</li><li>	9. 	Fluctuations 
<br />The participation in or purchase and selling of Digital Assets involves significant risk which is not generally shared with official fiat currencies or goods or commodities in a market. Unlike most fiat currencies, these Digital Assets are based on technology and trust. There is no central bank or another entity that can take corrective measure to protect the value or manage the supply and demand of the Digital Assets during. The prices of Digital Assets may suffer a large fluctuation in value and may become worthless. Cybex will not (nor has the obligation or responsibility to) stabilize or otherwise affect and make no guarantee about any digital asset’s market price. You should carefully assess whether your objectives, financial situation, needs, experience and tolerance for risk is suitable for participating, buying or selling Digital Assets.
</li></ol>
        <h3 className="center title-sub"> Scope of Responsibility and Limitation of Liability </h3>
        <ol>


	<li>1. 	Cybex will provide the Services to you on an “as is" and "as available" basis. However, Cybex does not make any express or implied warranties in relation to the Services, including but not limited to the suitability of the Services, the Services contain no errors or omissions, and durability, accuracy, reliability, and fitness for a particular purpose of the Services. Cybex does not make any undertakings or guarantees regarding the validity, accuracy, correctness, reliability, quality, stability, completeness and timeliness of the technology and information related to the Services. 
	</li><li>2. 	To the maximum extent permitted by law, in no event shall we be liable for any direct and indirect loss, damage or expense – irrespective of the manner in which it occurs – which may be suffered due to your use of our Services or our Platform and/or the information or materials contained on it, or as a result of the inaccessibility of this Platform and/or the fact that certain information or materials contained on it are incorrect, incomplete or not up-to-date.
	</li><li>3. 	Without limiting the above, we will not be held liable for:
        <br />(a)whether under contract law, torts law or otherwise, any business losses, loss of revenue, income, profits, opportunity or anticipated savings, loss of contracts or business relationships, loss of reputation or goodwill, and any other indirect, special or consequential loss.
        <br />(b)any loss or damage caused by a virus, corruption of information or data, distributed denial-of-service attack, or other technologically harmful material that may infect your computer equipment, computer programs, data or other proprietary material due to your use of our Platform or to your downloading of any content on it, or on any website linked to it.
	</li><li>4. 	These limitations of liability apply even if a loss was foreseeable, or if we have been expressly advised of the potential loss.
	</li><li>5. 	Nothing in these terms and conditions excludes or limits the liability of any party for fraud, death or personal injury caused by its negligence, breach of terms and conditions implied by operation of law, or any other liability which may not by law be limited or excluded.
	</li><li>6. 	Subject to the foregoing, our aggregate liability in respect of claims based on events arising out of or in connection with any User or Issuer’s use of the Platform and/or Service, whether in contract or tort (including negligence) or otherwise, shall in no circumstances exceed the greater of either:
  <br />(a)the total amount held on Account for the User or Issuer making a claim less any amount of applicable withdrawal fees; or
  <br />(b)100% of the amount of the transactions that are the subject of the claim less any amount of commission that may be due and payable in respect of such transactions;
	     and our total aggregate liability shall not exceed $5,000 for each User or Issuer.
  </li>
       </ol>
       <h3 className="center title-sub">Termination</h3>
       <ol>
       <li>1. 	You agree that Cybex has the right and full discretion and for any reason without prior notice to suspend or terminate part of or all of the Services provided to you, to temporarily freeze or permanently freeze (cancel) your account’s rights and access on the Platform, and will not be liable to you or any third party. 
	</li><li>2. 	Cybex has the right to terminate these terms and conditions and permanently freeze (cancel) your account’s rights and access on the Platform in the following circumstances:
	     <br />(a)The email address you have provided does not exist or is unable to receive emails, and there are no other ways to contact you, or Cybex notifies you through other means to change your email information but you have not changed your email to a valid email address within three (3) working days of our notification;
	     <br />(b)Core identification information you have provided is untrue, inaccurate, outdated or incomplete;
	     <br />(c)These terms and conditions (including the Relevant Rules) has been revised, and you express and notify Cybex that you are not willing to accept such terms and conditions or the Relevant Rules; and
	     <br />(d)Any other circumstances where Cybex believes that any Service should be terminated. 
	</li><li>3. 	Cybex has no obligation to retain or disclose to you any information in your account, or forward to you or any third party any information you have not read or has been sent after your account has been terminated or your account’s rights and access on the Platform have been permanently frozen (cancelled).
	</li><li>4. 	You agree that after you and Cybex’s contractual relationship has been terminated, Cybex still enjoys the following rights:
  <br />(a)To save your identification information and all transaction information generated during your use of the Services;
  <br />(b)If you have committed an illegal act or a breach of these terms and conditions and/or the Relevant Rules during your use of the Services, Cybex may still makes claim against you in accordance with these terms and conditions. 
         </li>
       </ol>
       <h3 className="center title-sub">Privacy Policy </h3>
       <p>Cybex will publish its privacy policy on the Platform, and may revise it from time to time. The privacy policy constitutes an effective part of these terms and conditions.
</p>
       <h3 className="center title-sub">Applicable Law and Dispute Resolution</h3>
       <p>The effectiveness, interpretation, revisions, implementation and dispute resolution of these terms and conditions will be subject to the laws of the Republic of Singapore and any conflicting legal rules or principles of Singapore will not be applicable to these terms and conditions. All disputes, issues or claims arising from these terms and conditions, including breach of contract and the validity and termination of these terms and conditions, will be arbitrated in Singapore International Arbitration Centre (hereinafter be referred to as “SIAC”) using the effective SIAC rules valid at the time of submission of the arbitration notice. 
</p>
        </div>
      </div>
      </div>
      
      
        {/* {!props.noCloseBtn && (
          <Trigger close={props.id}>
            <a href="#" className="close-button">
              &times;
            </a>
          </Trigger>
        )}
        {props.children} */}
      </Modal>
      // <div className={`detail-modal${isShow ? ` show`:` hide`}`}>
      //   <div className="modal-container">
      //     <div className="modal-title">123</div>
      //     <div className="modal-content">456</div>
      //     <div className="modal-footer">789</div>
      //   </div>
      //   <div className={`over-lay${isShow ? ` show`:` hide`}`}></div>
      // </div>
    );
  }
}
// console.log(BindToChainState(BaseModal));
// export default BaseModal;
// const Cao = BindToChainState(BaseModal);
export default AlertModal;

// export default connect(BaseModal,{
//     listenTo() {
//       return [AccountStore];
//     },
//     getProps(props) {
//       return {
//         myAccounts: AccountStore.getMyAccounts(),
//         accountsWithAuthState: AccountStore.getMyAccountsWithAuthState(),
//         isMyAccount: AccountStore.getState()
//       }
      // let assets = Map(),
      //   assetsList = List();
      // if (props.account.get("assets", []).size) {
      //   props.account.get("assets", []).forEach(id => {
      //     assetsList = assetsList.push(id);
      //   });
      // } else {
      //   assets = AssetStore.getState().assets;
      // }
      // let crowdsInited = CrowdFundStore.getState().initCrowds;
      // return {
      //   assets,
      //   assetsList,
      //   notification: NotificationStore.getState().notification,
      //   crowdsInited
      // };
  //   }
  // })
// export default BindToChainState(BaseModal);
