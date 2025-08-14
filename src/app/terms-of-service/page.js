"use client";
import styles from "./page.module.css";

export default function TermsAndConditions() {
  return (
    <main className={styles.container}>
      <h1 className={styles.h1}>Terms &amp; Conditions</h1>

      <div className={styles.section}>
        <h2 className={styles.h2}>Welcome to Prolifica Management</h2>
        <p className={styles.p}>
          These terms and conditions outline the rules and regulations for the
          use of Company Name’s Website, located at Website.com.
        </p>
        <p className={styles.p}>
          By accessing this website we assume you accept these terms and
          conditions. Do not continue to use Website Name if you do not agree to
          take all of the terms and conditions stated on this page.
        </p>
        <p className={styles.p}>
          The following terminology applies to these Terms and Conditions,
          Privacy Statement and Disclaimer Notice and all Agreements: “Client”,
          “You” and “Your” refers to you, the person log on this website and
          compliant to the Company’s terms and conditions. “The Company”,
          “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”,
          “Parties”, or “Us”, refers to both the Client and ourselves. All terms
          refer to the offer, acceptance and consideration of payment necessary
          to undertake the process of our assistance to the Client in the most
          appropriate manner for the express purpose of meeting the Client’s
          needs in respect of provision of the Company’s stated services, in
          accordance with and subject to, prevailing law of Netherlands. Any use
          of the above terminology or other words in the singular, plural,
          capitalization and/or he/she or they, are taken as interchangeable and
          therefore as referring to same.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.h2}>Cookies</h2>
        <p className={styles.p}>
          We employ the use of cookies. By accessing Website Name, you agreed to
          use cookies in agreement with the Company Name’s Privacy Policy.
        </p>
        <p className={styles.p}>
          Most interactive websites use cookies to let us retrieve the user’s
          details for each visit. Cookies are used by our website to enable the
          functionality of certain areas to make it easier for people visiting
          our website. Some of our affiliate/advertising partners may also use
          cookies.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.h2}>License</h2>
        <p className={styles.p}>
          Unless otherwise stated, Company Name and/or its licensors own the
          intellectual property rights for all material on Website Name. All
          intellectual property rights are reserved. You may access this from
          Website Name for your own personal use subjected to restrictions set
          in these terms and conditions.
        </p>
        <p className={styles.p}>You must not:</p>
        <ul className={styles.ul}>
          <li className={styles.li}>Republish material from Website Name</li>
          <li className={styles.li}>
            Sell, rent or sub-license material from Website Name
          </li>
          <li className={styles.li}>
            Reproduce, duplicate or copy material from Website Name
          </li>
          <li className={styles.li}>Redistribute content from Website Name</li>
        </ul>
        <p className={styles.p}>
          This Agreement shall begin on the date hereof.
        </p>
        <p className={styles.p}>
          Parts of this website offer an opportunity for users to post and
          exchange opinions and information in certain areas of the website.
          Company Name does not filter, edit, publish or review Comments prior
          to their presence on the website. Comments do not reflect the views
          and opinions of Company Name, its agents and/or affiliates. Comments
          reflect the views and opinions of the person who post their views and
          opinions. To the extent permitted by applicable laws, Company Name
          shall not be liable for the Comments or for any liability, damages or
          expenses caused and/or suffered as a result of any use of and/or
          posting of and/or appearance of the Comments on this website.
        </p>
        <p className={styles.p}>
          Company Name reserves the right to monitor all Comments and to remove
          any Comments which can be considered inappropriate, offensive or
          causes breach of these Terms and Conditions.
        </p>
        <p className={styles.p}>You warrant and represent that:</p>
        <ul className={styles.ul}>
          <li className={styles.li}>
            You are entitled to post the Comments on our website and have all
            necessary licenses and consents to do so;
          </li>
          <li className={styles.li}>
            The Comments do not invade any intellectual property right,
            including without limitation copyright, patent or trademark of any
            third party;
          </li>
          <li className={styles.li}>
            The Comments do not contain any defamatory, libelous, offensive,
            indecent or otherwise unlawful material which is an invasion of
            privacy;
          </li>
          <li className={styles.li}>
            The Comments will not be used to solicit or promote business or
            custom or present commercial activities or unlawful activity.
          </li>
        </ul>
        <p className={styles.p}>
          You hereby grant Company Name a non-exclusive license to use,
          reproduce, edit and authorize others to use, reproduce and edit any of
          your Comments in any and all forms, formats or media.
        </p>
      </div>

      {/* Repeat the same pattern for all the remaining sections from your text */}
      {/* ... */}
    </main>
  );
}
