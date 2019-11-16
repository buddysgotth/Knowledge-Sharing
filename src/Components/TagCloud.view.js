import 'd3-transition';
import { select } from 'd3-selection';
import React from 'react';
import { Section, Container, Heading } from 'react-bulma-components';
import ReactWordcloud from 'react-wordcloud';

const options = {
  colors: ['blue', 'red', 'orange', 'green', 'purple'],
  enableTooltip: true,
  deterministic: true,
  fontFamily: 'Kanit',
  fontStyle: 'normal',
  fontWeight: 'bold',
  padding: 3,
  rotations: 3,
  rotationAngles: [-45, 45],
  scale: 'log',
  spiral: 'rectangular'
};

class TagCloudView extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  getCallback = callback => {
    return (word, event) => {
      const isActive = callback !== 'onWordMouseOut';
      const element = event.target;
      const text = select(element);
      text
        .on('click', () => {
          if (isActive) {
            console.log(word.text);
            window.open(`/articles?tags=${word.id}&page=1`, '_self');
          }
        })
        .transition()
        .attr('background', 'white')
        .attr('text-decoration', isActive ? 'underline' : 'none');
    };
  };

  callbacks = {
    getWordTooltip: word => `"${word.text}" : ${word.value}`,
    onWordClick: this.getCallback('onWordClick'),
    onWordMouseOut: this.getCallback('onWordMouseOut'),
    onWordMouseOver: this.getCallback('onWordMouseOver')
  };

  updateDimensions() {
    this.setState({
      width: window.innerWidth
    });
  }

  render() {
    const { tags } = this.props;
    const { width } = this.state;
    return (
      <Section>
        <Container>
          <Heading className='has-text-centered'>Skooldio KNOWSHARE</Heading>
          <Heading subtitle className='has-text-centered'>
            What would like to find...
          </Heading>
        </Container>
        <Container>
          <ReactWordcloud
            callbacks={this.callbacks}
            words={tags}
            options={{ ...options, fontSizes: width <= 720 ? [20, 45] : [30, 90] }}
            minSize={[300, 450]}
          />
        </Container>
      </Section>
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }
}

export default TagCloudView;
