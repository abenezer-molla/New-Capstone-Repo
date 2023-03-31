import React from 'react';
import CardItem from './CardItem.js';
import avatar1 from '../data/cancer.jpeg';
import avatar2 from '../data/chronic.jpeg';
import avatar3 from '../data/emergency.jpeg';
import avatar4 from '../data/infec.jpeg';
import avatar5 from '../data/pedi.jpeg';
import avatar6 from '../data/gyne.jpeg';
import avatar8 from '../data/gy.jpeg';
import avatar7 from '../data/surgery.jpeg';
import '../SquareDisplay.css';

function Cards() {
  return (
    <div className="cards">
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src={avatar6}
              text="Insert data in Internal Medicine Wing Database"
              label="Internal Medicine"
              path="/intermedicine"
            />
          </ul>
          <br />
          <ul className="cards__items">
            <CardItem
              src={avatar5}
              text="Insert data in Pediatric Wing Database"
              label="Pediatrics"
              path="/pediatrics"
            />
            <CardItem
              src={avatar7}
              text="Insert data in Surgery Wing Database"
              label="Surgery"
              path="/surgery"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src={avatar4}
              text="Insert data in Infectious Diseases Wing Database"
              label="Infectious Diseases"
              path="/infectious"
            />
            <CardItem
              src={avatar1}
              text="Insert data in Cancer Wing Database"
              label="Cancer"
              path="/cancer"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src={avatar8}
              text="Insert data in Obstetrics and Gynecology Wing Database"
              label="Obstetrics and Gynecology"
              path="/obsandgyne"
            />
            <CardItem
              src={avatar2}
              text="Insert Chronic Illness Wing Database"
              label="Chronic Illness"
              path="/chronicill"
            />
            <CardItem
              src={avatar3}
              text="Insert data in Emergency Wing Database"
              label="Emergency Room"
              path="/emergencyRoom"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
