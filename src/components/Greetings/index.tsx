import { Button } from '../Button'
import { Container, Image, Text } from './styles'

export function Greetings() {
  function handleSayHello() {
    window.Main.sendMessage('Hello World')

    console.log('Message sent! Check main process log in terminal.')
  }

  return (
    <Container>
      <Image src="../../assets/images/kp11.svg" alt="ReactJS logo" />
      <Text>
        An Electron boilerplate including TypeScript, React, Jest and ESLint.
      </Text>
      <Button onClick={handleSayHello}>Диды выевали</Button>
    </Container>
  )
}
