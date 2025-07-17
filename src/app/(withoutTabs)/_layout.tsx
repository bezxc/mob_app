import { Stack } from "expo-router";

export default function WithoutTabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen
        name="colleaguesInfo"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="vacancies"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="magazines"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="privileges"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="eventInfo"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="documentsPage"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profileSettings"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notificationsPage"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="colleaguesBirthdayPage"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="polls"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="colleaguesFilters"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="issuesPage"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="priveleguesDevelopStage"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="galleryDevelopStage"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="documentsDevelopStage"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
