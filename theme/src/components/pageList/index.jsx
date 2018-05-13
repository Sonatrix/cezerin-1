import React, {Component} from 'react';
import api from '../../lib/api';
import PageList from './list';

export default class CustomPageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
    };
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps);
  }

  async fetchData({tags, sort}) {
    const filter = {
      tags,
      sort,
    };

    await api.ajax.pages.list(filter).then(({json}) => {
      this.setState({
        pages: json,
      });
    });
  }

  render() {
    const {pages} = this.state;
    return <PageList pages={pages} />;
  }
}
