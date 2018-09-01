import React, { Component } from 'react';
import { Map, Markers, Polyline } from 'react-amap';
import styles from './index.less';

export default class AMap extends Component {
  constructor(props) {
    super(props);
    this.lineEvents = {
      created: ins => {
        console.log(ins);
      },
      show: () => {
        console.log('line show');
      },
      hide: () => {
        console.log('line hide');
      },
      click: () => {
        console.log('line clicked');
      },
    };
    this.state = {};
  }

  static defaultProps = {
    amapKey: 'a7ef69e79c60052327da5049de854ab4',
    version: '1.4.9',
    markers: [],
  };

  render() {
    const { amapKey, version, markers, polyPath } = this.props;
    return (
      <Map
        amapkey={amapKey}
        version={version}
        className={styles.mapBox}
        zoom={15}
        center={markers && markers.length > 0 ? markers[markers.length - 1].position : undefined}
      >
        <Markers markers={markers} />
        <Polyline path={polyPath} events={this.lineEvents} visible={true} draggable={false} />
      </Map>
    );
  }
}
