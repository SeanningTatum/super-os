export const unsecuredPages = ['/', '/signin', '/signup']
export const securedPages = []

const MAROON = 'rgb(176, 70, 50)'
const DARK_GREEN = 'rgb(81, 152, 57)'
const MUSTARD_YELLOW = 'rgb(210, 144, 52)'
const DEEP_BLUE = 'rgb(44, 147, 252)'
const PURPLE = 'rgb(137, 96, 158)'
const PINK = 'rgb(205, 90, 145)'

export const theme = {
  primary: DEEP_BLUE,
  primary_linear: 'linear-gradient(to bottom, rgb(44, 147, 252) 0, rgb(42, 142, 248) 100%)',
  success: '#61BD4F',
  success_linear: 'linear-gradient(to bottom, #61BD4F 0, #5AAC44 100%)',
  success_box_shadow: '0 2px 0 #3F6F21',
  background: 'rgb(247, 247, 247)',
  contrast: 'rgb(255, 255, 255)',
  boxshadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
}

export const colors = [DEEP_BLUE, MUSTARD_YELLOW, DARK_GREEN, MAROON, PURPLE, PINK]
