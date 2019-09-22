import React from 'react';
import '../assets/style/menu.scss';

class MenuComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageClassname: '',
      choicesClassName: 'show-choices',
      showSuggetions: false,
      choiceindex: null,
      index: {},
      selected: { Salad: {}, Entree: {}, Soup: {} },
      menuItems: [
        { name: 'Salad',
          choices: [{ name: 'Santa Fe' }, { name: 'Greek' }, { name: 'Asian' }],
          related: [
            { name: 'Dressing',
              choices: [{ name: 'Italian' }, { name: 'Blue Cheese' }, { name: 'Ranch' }],
            },
            { name: 'Bread',
              choices: [{ name: 'Italian' }, { name: 'Flat' }, { name: 'Sourdough' }],
            },
          ] },
        { name: 'Entree',
          choices: [{ name: 'Steak' }, { name: 'Salmon' }, { name: 'Rice' }],
          related: [] },
        { name: 'Soup',
          choices: [{ name: 'Minestrone' }, { name: 'Hot and Sour' }, { name: 'Miso' }],
          related: [
            { name: 'Bread',
              choices: [{ name: 'Italian' }, { name: 'Flat' }, { name: 'Sourdough' }],
            },
          ] },
      ],
    };

    this.animateMenu = this.animateMenu.bind(this);
    this.renderMenuItems = this.renderMenuItems.bind(this);
    this.renderChoicesMenu = this.renderChoicesMenu.bind(this);
    this.stopChoicesAnimation = this.stopChoicesAnimation.bind(this);
  }

  /** *
  Stop choices animation from sdrolling down
  @param {None}
  @return {void}
  ** */

  stopChoicesAnimation = () => {
    setTimeout(() => {
      this.setState({
        choicesClassName: 'choices',
      });
    }, 1000);
  }

  /** *
  Animate intro screen after user has clicked menu button
  @param {None}
  @return {void}
  ** */

  animateMenu = () => {
    this.setState({
      imageClassname: 'animate-menu',
    });
    setTimeout(
      () => {
        this.setState({
          imageClassname: 'show-menu',
        });
      },
      500,
    );
  }

  /** *
  Dipslay suggestions to the user
  @param {None}
  @return {void}
  ** */

  displaySuggestion = (index, choicename, category, k) => {
    const { selected } = this.state;
    if (!selected[category][choicename]) {
      selected[category][choicename] = choicename;
      this.setState({
        index,
        showSuggetions: true,
        selected
        ,
      });
    } else {
      delete selected[category][choicename];
      this.setState({
        index,
        showSuggetions: true,
        selected
        ,
      });
    }
  }


  /** *
  Render suggestions list
  @param {Integer}
  @return {JSX}
  ** */

  renderSuggestions = (i) => {
    const { menuItems } = this.state;
    const suggetions = menuItems[i].related.map((item) => (
      <div className="suggetions">
        <li>{ item.name }</li>
        {this.renderSuggestionsChoice(item.choices)}
      </div>
    ));
    return (
      <div>
        {suggetions.length > 0 && <h3>You may also want</h3>}
        {suggetions}
      </div>
    );
  }

  /** *
  Render suggestions chpoices
  @param {Array}
  @return {JSX}
  ** */

  renderSuggestionsChoice = (choices) => {
    const choicesList = choices.map((item) => {
      const choicename = item.name;
      return (
        <div className="choice">
          <li>
            {choicename}
          </li>
          <button>
Select
          </button>
        </div>
      );
    });
    return choicesList;
  }

  /** *
  Render choices menu
  @param {Integer}
  @param {String}
  @return {JSX}
  ** */

  renderChoicesMenu =(i, category) => {
    const { menuItems, selected, choiceindex } = this.state;
    this.stopChoicesAnimation();
    const choices = menuItems[i].choices.map((item, k) => {
      const choicename = item.name;
      const isSelected = selected[category][choicename];
      return (
        <div>
          <div key={k + choicename + category} className="choice">
            <li>
              {choicename}
            </li>

            <button
              type="button"
              className={isSelected && 'active'}
              onClick={() => {
                this.displaySuggestion(
                  i, choicename, category, k);
              }}
            >
Select
            </button>
          </div>
          {isSelected && this.renderSuggestions(i)}
        </div>
      );
    });
    return choices;
  }

  /** *
  Render menu items
  @param {None}
  @return {JSX}
  ** */

  renderMenuItems = () => {
    const { menuItems, choicesClassName, showSuggetions, index, selected } = this.state;
    const menuCategories = menuItems.map((item, i) => (
      <div key={`${i + item.name}menu-item`} className="menu-item">
        <li key={`${i + item.name}menu-category`} className="menu-category">{item.name}</li>
        <div key={i + item.name + choicesClassName} className={choicesClassName}>
          {this.renderChoicesMenu(i, item.name)}
        </div>
      </div>
    ));

    return menuCategories;
  }

  render() {
    const { imageClassname } = this.state;
    return (
      <div>
        <div className="intro-div">
          <div className={`cover-image ${imageClassname}`}>
            <h1>Welcome to Restauranti</h1>
            <p className="fadetext">The home for delicious and quality meals</p>
            {imageClassname !== 'show-menu' && (
            <button onClick={this.animateMenu} type="button">
                See our Menu
              <br />
              <img src="https://res.cloudinary.com/g-draf-inc/image/upload/v1563259450/right-chevron_o8pp7n.svg" />
            </button>
            )}
          </div>
          {
            imageClassname === 'show-menu' && (
              <div>
                <h1>Restauranti Menu</h1>
                <div className="menu-holder">
                  {this.renderMenuItems()}
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default MenuComponent;
