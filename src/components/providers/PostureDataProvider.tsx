import { savePostureRecords } from "@src/services/postureRecordsApi";
import { updateUser } from "@src/services/userApi";
import { useUser } from "@src/state/useUser";
import { useEffect, useRef } from "react";

// TODO: Replace 20sec with 1min
// const ONE_MIN = 60000;
const TWENTY_SEC = 20000;

const PostureDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const intervalRef = useRef<any>();

  const user = useUser((state) => state.user);
  const postureData = useUser((state) => state.postureData);
  const preparePostureData = useUser((state) => state.preparePostureData);

  useEffect(() => {
    if (!!intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(
      (_user, _postureData, popData) => {
        if (_postureData.length) {
          console.log("--- save posture data task ---", _postureData.length);

          const data = popData();

          const records = data
            .filter((p) => p.status === "bad" || p.status === "good")
            .filter((p) => !!p.status && !!p.date)
            .map((p) => ({
              good_posture: p.status === "good",
              recorded_at: p?.date?.toISOString?.(),
            }));

          console.log({
            bad: data.filter((p) => p.status === "bad").length,
            good: data.filter((p) => p.status === "good").length,
          });

          savePostureRecords(records)
            .then(() => {
              console.log("posture data saved");

              updateUser(_user.id, {
                xp: _user.xp,
                hp: _user.hp,
                level: _user.level,
              })
                .then(() => {
                  console.log("user data saved");
                })
                .catch(() => {
                  console.log("[ERROR] user data not saved");
                });
            })
            .catch(() => {
              console.log("[ERROR] posture data not saved");
            });
        }
      },
      TWENTY_SEC,
      user,
      postureData,
      preparePostureData,
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [postureData.length, user.id]);

  return <>{children}</>;
};

export default PostureDataProvider;
