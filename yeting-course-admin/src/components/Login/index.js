import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Tabs, Row, Col, Input } from 'antd';
import classNames from 'classnames';
import LoginItem from './LoginItem';
import LoginTab from './LoginTab';
import LoginSubmit from './LoginSubmit';
import styles from './index.less';
import LoginContext from './loginContext';

const FormItem = Form.Item;

class Login extends Component {
  static propTypes = {
    className: PropTypes.string,
    defaultActiveKey: PropTypes.string,
    onTabChange: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    defaultActiveKey: '',
    onTabChange: () => {},
    onSubmit: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      type: props.defaultActiveKey,
      tabs: [],
      active: {},
      loginid: 'a',
    };
  }

  onSwitch = type => {
    this.setState({
      type,
    });
    const { onTabChange } = this.props;
    onTabChange(type);
  };

  getContext = () => {
    const { tabs } = this.state;
    const { form } = this.props;
    return {
      tabUtil: {
        addTab: id => {
          this.setState({
            tabs: [...tabs, id],
          });
        },
        removeTab: id => {
          this.setState({
            tabs: tabs.filter(currentId => currentId !== id),
          });
        },
      },
      form,
      updateActive: activeItem => {
        const { type, active } = this.state;
        if (active[type]) {
          active[type].push(activeItem);
        } else {
          active[type] = [activeItem];
        }
        this.setState({
          active,
        });
      },
    };
  };

  handleSubmit = e => {
    e.preventDefault();
    const { active, type } = this.state;
    const { form, onSubmit } = this.props;
    const activeFileds = active[type];
    form.validateFields(activeFileds, { force: true }, (err, values) => {
      onSubmit(err, values);
    });
  };

  componentDidMount() {
    const id = document.getElementById('login_container');
    console.log(id);
    // const obj = new WxLogin({
    //   id: this.state.loginid,//div的id
    //   appid: "wx5acbeb3eda1f86c5",
    //   scope: "snsapi_login",//写死
    //   // redirect_uri:encodeURIComponent("https://" + window.location.host),
    //   redirect_uri: 'https://open.weixin.qq.com/connect/qrconnect?appid=wxbdc5610cc59c1631&redirect_uri=https%3A%2F%2Fpassport.yhd.com%2Fwechat%2Fcallback.do&response_type=code&scope=snsapi_login&state=3d6be0a4035d839573b04816624a415e#wechat_redirect',
    //   state: "",
    //   style: "black",//二维码黑白风格
    //   href: ""
    // });
    // console.log(obj)
  }

  render() {
    const {
      className,
      children,
      form: { getFieldDecorator },
    } = this.props;
    const { type, tabs } = this.state;
    const TabChildren = [];
    const otherChildren = [];
    React.Children.forEach(children, item => {
      if (!item) {
        return;
      }
      // eslint-disable-next-line
      if (item.type.typeName === 'LoginTab') {
        TabChildren.push(item);
      } else {
        otherChildren.push(item);
      }
    });
    return (
      <LoginContext.Provider value={this.getContext()}>
        <div className={classNames(className, styles.login)}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator(this.state.loginid)(
                <Row type="flex" justify="center" align="middle">
                  <Col>
                    <div id="a" onClick={() => this.setState({ loginid: 'a' })}>
                      234243
                    </div>
                  </Col>
                  <Col>
                    {' '}
                    <div id="b" onClick={() => this.setState({ loginid: 'b' })}>
                      234243
                    </div>
                  </Col>
                  <Col>
                    {' '}
                    <div id="c" onClick={() => this.setState({ loginid: 'c' })}>
                      234243
                    </div>
                  </Col>
                </Row>
              )}
            </FormItem>

            {tabs.length ? (
              <React.Fragment>
                <Tabs
                  animated={false}
                  className={styles.tabs}
                  activeKey={type}
                  onChange={this.onSwitch}
                >
                  {TabChildren}
                </Tabs>

                {otherChildren}
              </React.Fragment>
            ) : (
              [...children]
            )}
            {/* <div id="login_container"></div> */}
          </Form>
        </div>
      </LoginContext.Provider>
    );
  }
}

Login.Tab = LoginTab;
Login.Submit = LoginSubmit;
Object.keys(LoginItem).forEach(item => {
  Login[item] = LoginItem[item];
});

export default Form.create()(Login);
