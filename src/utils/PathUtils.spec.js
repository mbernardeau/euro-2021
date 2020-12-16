import { toFirebasePath, toDotPath } from './PathUtils'

describe('Utils/PathUtils', () => {
  it('should convert / to .', () => {
    const fbPath = 'a/b/cfgqs'

    expect(toDotPath(fbPath)).toBe('a.b.cfgqs')
  })

  it('should convert . to /', () => {
    const dotPath = 'a.b.cfgqs'

    expect(toFirebasePath(dotPath)).toBe('a/b/cfgqs')
  })
})
