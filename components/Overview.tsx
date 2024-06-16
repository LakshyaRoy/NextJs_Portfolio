import React from "react";

const Overview = () => {
  const paraValue = `I am a front-end developer beginner with a Bachelor's degree in computer
  applications. I am seeking a position as a Frontend Developer to learn
  from experienced professionals, grow in the field, and contribute to
  real-world projects. I possess the ability to design visually appealing
  and user-friendly websites and applications and am eager to provide
  meaningful contributions to any front-end development team.`;

  const styles = {
    sectionHeadText:
      "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
    sectionSubText:
      "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider",
    paraStyles: " mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]",
  };
  return (
    <section className="mb-20">
      <div>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </div>

      <div className={styles.paraStyles}>{paraValue}</div>
    </section>
  );
};

export default Overview;
