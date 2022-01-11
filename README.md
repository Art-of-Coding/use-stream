# Use Redis Streams

'Use' Redis streams for node.js.

Inspired by `React` Hooks.

Extracted from a personal project. It makes use of my other streams library,
[redis-streams-manager](https://github.com/MichielvdVelde/redis-streams-manager).

## Install

```
npm i @art-of-coding/use-stream
```

## Example

Every call to `useStream` creates a separate subscription, so you can use
`unsubscribe()` when you're done locally without affecting other possible
subscriptions.

```typescript
import IORedis from "ioredis";
import buildUse from "@art-of-coding/use-stream";
import StreamsManager from "redis-streams-manager";

const blockingConnection = new IORedis();
const manager = new StreamsManager(blockingConnection);
// Build a use function
export const useStream = buildUse(manager);

// somewhere else...

const [events, unsubscribe] = useStream("my-stream");

events.on("entry", (entry: Record<string, string>, id: string) => {
  // do something with the entry
  // and unsubscribe from the stream
  unsubscribe();
});
```

## License

Copyright 2021-2022 [Michiel van der Velde](https://michielvdvelde.nl).

This software is licensed under [the MIT License](LICENSE).
