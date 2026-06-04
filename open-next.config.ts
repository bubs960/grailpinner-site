import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

// Wire incremental cache to KV so ISR responses have somewhere durable to live.
// Without this the adapter's cache is a no-op; every page render hits the worker uncached.
//
// Binding name MUST be NEXT_INC_CACHE_KV (hard-coded in the kv-incremental-cache module).
// Wrangler.toml exposes the KV namespace under this binding name; cache keys are
// namespaced under "isr-cache" prefix to keep them separated from other keys.
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
});
