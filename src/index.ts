import { EventEmitter } from 'events'
import StreamsManager, { StreamListener } from 'redis-streams-manager'

export default function buildUse(manager: StreamsManager): (key: string) => [EventEmitter, () => void] {
  return key => {
    const events = new EventEmitter()

    const handleEntry: StreamListener = (entry, id) => {
      events.emit('entry', entry, id)
    }

    manager.on(key, handleEntry)

    return [events, () => {
      manager.removeListener(key, handleEntry)
    }]
  }
}
