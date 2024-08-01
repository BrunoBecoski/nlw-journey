import { Plus } from "lucide-react-native"
import { useState } from "react"
import { Alert, Text, View } from "react-native"

import { colors } from "@/styles/colors"

import { linksServer } from "@/server/link-server"

import { Button } from "@/components/button"
import { Modal } from "@/components/modal"
import { Input } from "@/components/input"
import { validateInput } from "@/utils/validateInput"

export function Details({ tripId }: { tripId: string }) {
  // MODAL
  const [showNewLinkModal, setShowNewLinkModal] = useState(false)

  // LOADING
  const [isCreatingLinkTrip, setIsCreatingLinkTrip] = useState(false)

  // DATA
  const [linkTitle, setLinkTitle] = useState('')
  const [linkURL, setLinkURL] = useState('')

  function resetNewLinkFields() {
    setLinkTitle('')
    setLinkURL('')
    setShowNewLinkModal(false)
  }

  async function handleCreateTripLink() {
    try {
      if (!linkTitle.trim()) {
        Alert.alert('Link', 'Informe um título para o link.')
      }

      if (!validateInput.url(linkURL.trim())) {
        Alert.alert('Link', 'Link inválido!')
      }

      setIsCreatingLinkTrip(true)

      await linksServer.create({
        tripId,
        title: linkTitle,
        url: linkURL,
      })

      Alert.alert('Link', 'Link criado com sucesso!')
      resetNewLinkFields()
    } catch (error) {
      console.log(error)
    } finally {
      setIsCreatingLinkTrip(false)
    }
  }

  return (
    <View className="flex-1 mt-10">
      <Text className="text-zinc-50 text-2xl font-semibold mb-2">
        Links importantes
      </Text>

      <View className="flex-1">
        <Button variant="secondary" onPress={() => setShowNewLinkModal(true)}>
          <Plus color={colors.zinc[200]} size={20} />
          <Button.Title>Cadastrar novo link</Button.Title>
        </Button>
      </View>

      <Modal 
        title="Cadastrar link" 
        subtitle="Todos os convidados podem visualizar os links importantes."
        visible={showNewLinkModal}
        onClose={() => setShowNewLinkModal(false)}
      >
        <View className="gap-2 mb-3">
          <Input variant="secondary">
            <Input.Field
              placeholder="Título do link"
              onChangeText={setLinkTitle}
            />
          </Input>

          <Input variant="secondary">
            <Input.Field placeholder="URL" onChangeText={setLinkURL} />
          </Input>
        </View>

        <Button isLoading={isCreatingLinkTrip} onPress={handleCreateTripLink}>
          <Button.Title>Salvar link</Button.Title>
        </Button>
      </Modal>
    </View>
  )
}