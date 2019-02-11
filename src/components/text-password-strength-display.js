/* eslint import/no-unresolved: [2, { ignore: ['react-native', 'react'] }] */
import React from 'react';
import {
  View, Text,
} from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

// Components
import scorePassword from '../utils/score-password';
import calculateLevel from '../utils/calculate-level';

// Style
import style from '../style';
import { TEXT_PASSWORD_STRENGTH_DISPLAY } from '../constants';

function TextPasswordStrengthDisplay({
  password,
  touched,
  scoreLimit,
  variations,
  minLength,
  labelVisible,
  levels,
  wrapperStyle,
  labelStyle,
  iconCfg
}) {
  const score = scorePassword(password, minLength, scoreLimit, variations);
  const { label, labelColor } = calculateLevel(score, levels);
  const icon = <Icon type={iconCfg.type} name={iconCfg.name} style={{ color: labelColor, marginRight: 5 }} />;
  const text = <Text style={[style.label, labelStyle, { color: labelColor }]}>{label}</Text>;
  const both = (
      <View style={{ flexDirection: 'row' }}>
        {icon}
        {text}
      </View>
    );
  return (
    <View style={[style.wrapper, wrapperStyle]}>
      {labelVisible && (touched || score !== 0)
        ? (iconCfg ? both : text)
        : null
      }
    </View>
  );
}

TextPasswordStrengthDisplay.defaultProps = TEXT_PASSWORD_STRENGTH_DISPLAY;

TextPasswordStrengthDisplay.propTypes = {
  password: PropTypes.string.isRequired,
  touched: PropTypes.bool,
  scoreLimit: PropTypes.number,
  variations: PropTypes.object,
  minLength: PropTypes.number,
  labelVisible: PropTypes.bool,
  levels: PropTypes.array,
  wrapperStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  iconCfg: PropTypes.object
};

export default TextPasswordStrengthDisplay;
