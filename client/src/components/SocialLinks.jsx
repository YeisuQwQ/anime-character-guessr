import '../styles/social.css';

const SOCIAL_TEXT = {
  zh: {
    difficultyHint: '太难了？调下难度'
  },
  en: {
    difficultyHint: 'Too hard? Adjust difficulty'
  }
};

function SocialLinks({ onSettingsClick, locale = 'zh' }) {
  const text = SOCIAL_TEXT[locale] || SOCIAL_TEXT.zh;

  return (
    <div className="social-links">
      <div className="difficulty-hint">
        <span>{text.difficultyHint}</span>
        <div className="arrow"></div>
      </div>
      <button className="social-link settings-button" onClick={onSettingsClick}>
        <i className="fas fa-cog"></i>
      </button>
    </div>
  );
}

export default SocialLinks;
