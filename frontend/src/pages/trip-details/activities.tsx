import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Activity } from "../../components/activity"
import { api } from "../../lib/axios"

interface Activity {
  date: string
  activities: {
    id: string
    title: string
    occurs_at: string
  }[]
}

interface ActivitiesProps {
  startsAt: string
  endsAt: string
}

export function Activities({ startsAt, endsAt }: ActivitiesProps) {
  const { tripId } = useParams()
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
  }, [tripId])

  return (
    <div className="space-y-8">
      {activities.map(category => {
        return (
          <div key={category.date} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-zinc-300 font-semibold">Dia {format(category.date, 'd')}</span>
              <span className="text-xs text-zinc-500">{format(category.date, 'EEEE', { locale: ptBR })}</span>
            </div>
            {category.activities.length > 0 ? (
              <div className="space-y-2.5">
                {category.activities.map(activity => {
                  return (
                    <Activity
                      key={activity.id} 
                      title={activity.title}
                      occursAt={activity.occurs_at}
                      startsAt={startsAt}
                      endsAt={endsAt}
                    />
                  )
                })}
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
            )}
          </div>
        )
      })}
    </div>
  )
}