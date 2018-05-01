import * as React from "react"; import * as PropTypes from "prop-types";
import Translate from "react-translate-component";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTelegram } from '@fortawesome/fontawesome-free-brands';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faTelegram);

export class Contact extends React.Component<any, any> {
  render() {
    return (
      <div className="contact-wrapper">
        <Translate component="h2" className="text-center contact-title" content="contact.title" />
        <table className="contact-table">
          <tbody>
            <tr>
              <td className="bigger">
                <FontAwesomeIcon icon={["fab","telegram"]} />
              </td>
              <td className="bigger">
                <Translate component="strong" content="contact.telegram"/>
              </td>
              <td>
                <p>
                  中文：<a href="https://t.me/CYBEXChinese" target="_blank">https://t.me/CYBEXChinese</a>
                </p>
                <p>
                  English: <a href="https://t.me/CYBEXEnglish" target="_blank">https://t.me/CYBEXEnglish</a>
                </p>
              </td>
            </tr>
            <tr>
              <td className="bigger">
                <FontAwesomeIcon icon={["fab","telegram"]} />
              </td>
              <td className="bigger">
                <Translate component="strong" content="contact.email"/>
              </td>
              <td>
                <p>
                  <a href="mailto:service@cybex.io" target="_blank">service@cybex.io</a>
                </p>
                <Translate unsafe component="p" content="contact.email_tip"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Contact;