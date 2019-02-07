const { isPost, isProfile, isInstagramUrl } = require('../modules/Validator')

describe('Instagram Url Validation', () => {
  it('Truthy Validations', () => {
    expect(isInstagramUrl('www.instagram.com/abc/ade-esw35r')).toBe(true)
    expect(isInstagramUrl('https://www.instagram.com/abcdef?btn-grp=share')).toBe(true)
    
  })
})

describe('Profile Url Validation', () => {

})
describe('Post Url Validation', () => {

})