import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Spin, Icon } from 'antd';
import Card from 'react-credit-card'
import 'react-credit-card/source/card.css'
import 'react-credit-card/source/card-types.css'
import moment from 'moment';
import './ContactView.css';

const mapstyle = `&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xf5f5f5&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x616161&style=element:labels.text.stroke%7Ccolor:0xf5f5f5&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:road%7Ccolor:0xa8eff2&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road%7Celement:geometry.fill%7Ccolor:0xa8eff2&style=feature:road%7Celement:labels%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada&style=feature:road.highway%7Celement:geometry.fill%7Ccolor:0x68686a&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:transit%7Cvisibility:off&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:geometry.fill%7Ccolor:0x8e8a90&style=feature:water%7Celement:labels.text%7Cvisibility:off&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&size=150x150&markers=anchor:center%7C`;

const getBackground = (value) => {
  let color = '';
  switch (value.toLowerCase()) {
    case 'red':
      color = 'linear-gradient(120deg, #D4145A, #FBB03B)'
      break;
    case 'orange':
      color = 'linear-gradient(120deg, #ED1C24, #FCEE21)'
      break;
    case 'yellow':
      color = 'linear-gradient(120deg, #FB872B, #D9E021)'
      break;
    case 'green':
      color = 'linear-gradient(120deg, #009245, #FCEE21)'
      break;
    case 'purple':
      color = 'linear-gradient(120deg, #3A3897, #A3A1FF)'
      break;
    case 'black':
      color = 'linear-gradient(120deg, #333333, #5A5454)'
      break;
    case 'white':
    case 'silver':
      color = 'linear-gradient(120deg, #808080, #E6E6E6)'
      break;
    case 'brown':
      color = 'linear-gradient(120deg, #45145A, #FF5300)'
      break;
    case 'blue':
    default:
      color = 'linear-gradient(120deg, #00c6ff, #0072ff)'
      break;
  }
  return color;
}

const defaultContact = {
  title: '',
  gender: '',
  firstname: '',
  middleinitial: '',
  lastname: '',
  streetAddress: '',
  city: '',
  state: '',
  zipcode: '',
  country: '',
  email: '',
  username: '',
  password: '',
  browser: '',
  phone: '',
  phoneCountryCode: '',
  mothersMadien: '',
  birthday: '',
  age: '',
  ccType: '',
  ccNumber: '',
  ccv2: '',
  ccExpires: '',
  nationalId: '',
  ups: '',
  westernUnionMTCN: '',
  moneyGramMTCN: '',
  color: '',
  occupation: '',
  company: '',
  vehicle: '',
  domain: '',
  guid: '',
  latitude: '',
  longitude: ''
};

class ContactView extends Component {

  state = {
    contact: undefined,
    isLoading: true
  };

  componentDidMount() {
    return fetch(`https://sibi-db-tadscritch.herokuapp.com/contacts/${this.props.match.params.id}`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        this.setState({
          contact: Object.assign({}, defaultContact, data),
          isLoading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const c = this.state.contact;
    const background = c ? getBackground(c.color) : 'linear-gradient(120deg, #00c6ff, #0072ff)';

    const info = c ? {
      name: (<h1>{ c.title === 'Dr.' ?  'Dr. ' : '' }{ `${c.firstname} ${c.middleinitial ? c.middleinitial + '.' : ''}` }<br/>{ c.lastname || '' }</h1>),
      personal: (<div className="details">
        <p>{ `${c.gender ? (c.gender[0].toUpperCase() + c.gender.slice(1) + ' | ') : ''}${c.birthday ? moment(c.birthday).format("MMMM, Do YYYY") + ' | ' : ''}${c.username ? '@' + c.username : ''}`}</p>
      </div>),
      contact: (<div className="contact">
        <p>
          <a href={`mailto:${c.email || ''}`}><Icon type="mail" /> { `${c.email ? c.email.toLowerCase() : ''}` }</a><br/>
          <a href={`tel:${c.phoneCountryCode || ''}${c.phone || ''}`}><Icon type="phone" /> {`${c.phoneCountryCode ? '+' + c.phoneCountryCode : ''} ${c.phone || ''}`}</a>
        </p>
      </div>),
      occupation: (<div className="occupation">
        <p>{ `${c.occupation ? c.occupation + ' at ' : ''}${c.company || ''}`}</p>
      </div>),
      address: (<div className="text"><p>{ `${c.streetAddress || ''}`}<br/>{`${c.city ? c.city + ' , ' : ''}${c.state || ''} ${c.zipcode || ''}`}<br/>{`${c.country || ''}`}</p></div>),
      map: (c.latitude && c.longitude ? <div className="map"><img alt="map" src={`https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyBkhJbCFVw-NdEmdMdtoKXSReLi6oynmLo&center=${c.latitude},${c.longitude}&zoom=13${mapstyle}${c.latitude},${c.longitude}`}/></div> : null),
      card: (<Card
          type={c.ccType ? c.ccType.toLowerCase() : ''}
          name={c.firstname + ' ' + c.lastname}
          number={c.ccNumber}
          cvc={c.ccv2}
          expiry={moment(c.ccExpires, "M/YYYY").format("MM/YY")}>
        </Card>
      )
    } : {};

    const details = c ? {
      website: (<div className="website detail" key="website">
        <h4>Website</h4>
        <p>{ c.domain ? (<a href={`http://${c.domain}`}>{ c.domain }</a>) : '' }</p>
      </div>),
      browsers: (<div className="browsers detail" key="browsers">
        <h4>Browsers</h4>
        <p>{ c.browser || '' }</p>
      </div>),
      nationalId: (<div className="nationalId detail" key="nationalId">
        <h4>National Id</h4>
        <p>{ c.nationalId || '' }</p>
      </div>),
      ups: (<div className="ups detail" key="ups">
        <h4>UPS</h4>
        <p>{ c.ups || '' }</p>
      </div>),
      westernUnionMTCN: (<div className="westernUnionMTCN detail" key="westernUnionMTCN">
        <h4>Western Union MTCN</h4>
        <p>{ c.westernUnionMTCN || '' }</p>
      </div>),
      moneyGramMTCN: (<div className="moneyGramMTCN detail" key="moneyGramMTCN">
        <h4>MoneyGram MTCN</h4>
        <p>{ c.moneyGramMTCN || '' }</p>
      </div>),
      vehicle: (<div className="vehicle detail" key="vehicle">
        <h4>Vehicle</h4>
        <p>{ c.vehicle || '' }</p>
      </div>),
      guid: (<div className="guid detail" key="guid">
        <h4>GUID</h4>
        <p>{ c.guid || '' }</p>
      </div>),
    } : {};

    return (
      <div className="ContactView">

        <div className="header" style={{ background: background }}>
          <Link to={'/'}>
            <Icon type="left-circle-o" style={{ fontSize: 24, color: '#fff' }}/>
          </Link>

          <div className="information">

            <div className="personal">
              { info.name }

              { info.personal }

              { info.occupation }

              { info.contact }
            </div>

            <div className="address">
              { info.map }
              { info.address }
            </div>

            <div className="creditcard">
              { info.card }
            </div>

          </div>

        </div>

        { this.state.isLoading ? <Spin></Spin> : null }

        <div className="more-info">
          <h2>More Details</h2>

          <div className="info">
            { Object.keys(details).map((key) => (details[key])) }
          </div>

        </div>

      </div>
    );
  }
}

export default ContactView;
