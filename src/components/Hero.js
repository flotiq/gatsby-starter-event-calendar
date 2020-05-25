/* eslint-disable react/jsx-wrap-multilines */

import React from 'react'
import { Box, Heading, Button, Text, Image, ResponsiveContext } from 'grommet'
import { graphql, StaticQuery } from 'gatsby'
import ConfigContext from './ConfigContext'

const Hero = () => (
  <ConfigContext.Consumer>
    {appConfig => (
      <ResponsiveContext.Consumer>
        {size => (
          <Box
            a11yTitle="Calendar events title"
            align="center"
            flex="grow"
            height="100vh"
            justify="center"
            pad="medium"
            animation="slideDown"
          >
            <StaticQuery
              query={graphql`
                {
                  imageSharp {
                    original {
                      src
                    }
                  }
                }
              `}
              render={data => {
                return (
                  <Box
                    width={size === 'small' ? 'xsmall' : 'small'}
                    height={size === 'small' ? 'xsmall' : 'small'}
                    margin={{ bottom: 'medium' }}
                  >
                    {(typeof(data.imageSharp) !== 'undefined' && data.imageSharp.original !== null &&
                    <Image fit="contain" src={data.imageSharp.original.src} a11yTitle="logo" />
                    )}
                  </Box>
                )
              }}
            />

            <Heading size="large" align="center" a11yTitle="Application title">
              {appConfig.title}
            </Heading>

            {appConfig.subTitle && (
              <Heading align="center" a11yTitle="Application sub title">
                {appConfig.subTitle}
              </Heading>
            )}

            <Box
              direction={size === 'small' ? 'column' : 'row'}
              margin={{ top: 'large' }}
              gap="medium"
              style={{minHeight: 'auto'}}
            >
              <Button
                href="#calendars"
                label={
                  <Text size="large" margin="small">
                    See all the events
                  </Text>
                }
                a11yTitle="See all the events"
                primary
              />
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    )}
  </ConfigContext.Consumer>
)

export default Hero
