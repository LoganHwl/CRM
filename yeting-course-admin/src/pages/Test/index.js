import React, { Component, Fragment } from 'react';
import { Breadcrumb } from 'antd';
import * as routertext from '../../../config/router.config';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class test extends Component {
  render() {
    return (
      <Fragment>
        <PageHeaderWrapper />

        <div>
          <h1>test</h1>
        </div>
      </Fragment>
    );
  }
}

export default test;
