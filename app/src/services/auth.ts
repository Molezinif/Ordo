export function signIn(): Promise<{
  data: {
    token: string
    user: {
      name: string
      email: string
    }
  }
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          token: 'mockToken',
          user: {
            name: 'Gabriel',
            email: 'gabrielmolezinif@gmail.com'
          }
        }
      })
    }, 2000)
  })
}

// TODO: implement endpoint
