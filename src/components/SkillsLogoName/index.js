import './index.css'

const SkillsLogoName = props => {
  const {eachSkillObj} = props
  const {imageUrl, name} = eachSkillObj

  return (
    <li className="skills-logo-container">
      <img src={imageUrl} alt={name} className="skills-logo" />
      <p className="skills-para">{name}</p>
    </li>
  )
}

export default SkillsLogoName
