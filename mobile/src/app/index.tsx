import dayjs from "dayjs"
import {
  ArrowRight,
  AtSign,
  Calendar as IconCalendar,
  MapPin,
  Settings2,
  UserRoundPlus
} from "lucide-react-native"
import { useState } from "react"
import { Alert, Image, Keyboard, Text, View } from "react-native"
import { DateData } from "react-native-calendars"

import { colors } from "@/styles/colors"
import { calendarUtils, DatesSelected } from '@/utils/calendarUtils'
import { validateInput } from "@/utils/validateInput"

import { Button } from "@/components/button"
import { Calendar } from "@/components/calendar"
import { GuestEmail } from "@/components/email"
import { Input } from "@/components/input"
import { Modal } from "@/components/modal"

enum StepForm {
  TRIP_DETAILS = 1,
  ADD_EMAILS = 2,
}

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
  GUESTS = 2,
}

export default function Index() {
  // DATA
  const [stepForm, setStepForm ] = useState(StepForm.TRIP_DETAILS)
  const [selectedDates, setSelectedDates] = useState({} as DatesSelected)
  const [destination, setDestination] = useState('')
  const [emailToInvite, setEmailToInvite] = useState("")
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  // MODAL
  const [showModal, setShowModal] = useState(MODAL.NONE)

  function handleNextStepForm() {
    if (
      destination.trim().length === 0 || 
      !selectedDates.startsAt ||
      !selectedDates.endsAt
    ) {
      return Alert.alert(
        'Detalhes da viagem',
        'Preencha todas as informações da viagem para seguir.'
      )
    }

    if (destination.length < 4) {
      return Alert.alert(
        'Detalhes da viagem',
        'O destino deve ter pelo menos 4 caracteres.'
      )
    }

    if (stepForm == StepForm.TRIP_DETAILS) {
      return setStepForm(StepForm.ADD_EMAILS)
    }
  }

  function handleSelectDate(selectedDay: DateData) {
    const dates = calendarUtils.orderStartsAtAndEndsAt({
      startsAt: selectedDates.startsAt,
      endsAt: selectedDates.endsAt,
      selectedDay, 
    })

    setSelectedDates(dates)
  }

  function handleRemoveEmail(emailToRemove: string) {
    setEmailsToInvite((prevState) => 
      prevState.filter((email) => email !== emailToRemove)
    )
  }

  function handleAddEmail() {
    if (!validateInput.email(emailToInvite)) {
      return Alert.alert('Convidado', 'E-mail inválido!')
    }

    const emailAlreadyExists = emailsToInvite.find(
      (email) => email === emailToInvite
    )

    if (emailAlreadyExists) {
      return Alert.alert('Convidado', 'E-mail já foi adicionado inválido!')
    }

    setEmailsToInvite((prevState) => [...prevState, emailToInvite])
    setEmailToInvite('')
  }

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Image
        source={require('@/assets/logo.png')}
        className="h-8"
        resizeMode="contain"
      />

      <Image source={require('@/assets/bg.png')} className="absolute" />

      <Text className="text-zinc-400 font-regular text-center text-lg mt-3">
        Convide seus amigos e planeje sua{'\n'}próxima viagem
      </Text>

      <View className="w-full bg-zinc-900 p-4 rounded-xl my-8 border border-zinc-800">
        <Input>
          <MapPin color={colors.zinc[400]} size={20} />
          <Input.Field 
            placeholder="Para onde?" 
            editable={stepForm == StepForm.TRIP_DETAILS}
            onChangeText={setDestination}
            value={destination}
          />
        </Input>

        <Input>
          <IconCalendar color={colors.zinc[400]} size={20} />
          <Input.Field 
            placeholder="Quando?" 
            editable={stepForm == StepForm.TRIP_DETAILS}
            onFocus={() => Keyboard.dismiss()}
            showSoftInputOnFocus={false}
            onPressIn={() => 
              stepForm === StepForm.TRIP_DETAILS && setShowModal(MODAL.CALENDAR)
            }
            value={selectedDates.formatDatesInText}
          />
        </Input>

        { stepForm === StepForm.ADD_EMAILS && (
          <>
            <View className="border-b py-3  border-zinc-800">
              <Button
                variant="secondary"
                onPress={() => setStepForm(StepForm.TRIP_DETAILS)}
              >
                <Button.Title>Alterar local/data</Button.Title>
                <Settings2 color={colors.zinc[200]} size={20} />
              </Button>
            </View>

            <Input>
              <UserRoundPlus color={colors.zinc[400]} size={20} />
              <Input.Field
                placeholder="Quem estará na viagem?"
                autoCorrect={false}
                value={
                  emailsToInvite.length > 0
                  ? `${emailsToInvite.length} pessoa(s) convidada(s)`
                  : ''
                }
                onPress={() => {
                  Keyboard.dismiss()
                  setShowModal(MODAL.GUESTS)
                }}
                showSoftInputOnFocus={false}
              />
            </Input>
          </>
        )}

        <Button onPress={handleNextStepForm}>
          <Button.Title>{
            stepForm === StepForm.TRIP_DETAILS 
            ? "Continuar"
            : "Confirmar Viagem"
          }</Button.Title>
          <ArrowRight color={colors.lime[950]} size={20} />
        </Button>
      </View>

      <Text className="text-zinc-500 font-regular text-center text-base">
        Ao planejar sua viagem pela plann.er você automaticamente concorda com nossos
        {" "}
        <Text className="text-zinc-300 underline">
          termos de uso e políticas de privacidade
        </Text>.
      </Text>

      <Modal
        title="Selecionar datas" 
        subtitle="Selecione a data de ida e volta da viagem"
        visible={showModal === MODAL.CALENDAR}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="gap-4 mt-4">
          <Calendar
            minDate={dayjs().toISOString()}
            onDayPress={handleSelectDate}
            markedDates={selectedDates.dates}
          />
          
          <Button onPress={() => setShowModal(MODAL.NONE)}>
            <Button.Title>Confirmar</Button.Title>
          </Button>
        </View>
      </Modal>

      <Modal 
        title="Selecionar convidados"
        subtitle="Os convidados irão receber e-mails para confirmar a participação na viagem"
        visible={showModal === MODAL.GUESTS}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="my-2 flex-wrap gap-2 border-b border-zinc-600 py-5 items-start">
          {emailsToInvite.length > 0 ? (
            emailsToInvite.map((email) => (
              <GuestEmail
                key={email}
                email={email}
                onRemove={() => handleRemoveEmail(email)}
              />
            ))
          ) : (
            <Text className="text-zinc-600 text-base font-regular">
              Nenhum e-mail adicionado.
            </Text>
          )}
        </View>

        <View className="gap-4 mt-4">
          <Input variant="secondary">
            <AtSign color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="Digite o e-mail do convidado"
              keyboardType="email-address"
              onChangeText={(text) => setEmailToInvite(text.toLocaleLowerCase())}
              value={emailToInvite}
              returnKeyType="send"
              onSubmitEditing={handleAddEmail}
            />
          </Input>

          <Button onPress={handleAddEmail}>
            <Button.Title>Convidar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}